import test from 'node:test';
import assert from 'node:assert/strict';
import { getSpaceWeather, normalizeFlare, WEATHER_CACHE_KEY } from '../src/services/spaceWeather.js';
const now = new Date('2026-11-14T10:00:00Z');
const archive = { kind:'Geomagnetic storm', classification:'G5', occurredAt:'2024-05-10', sourceUrl:'https://science.nasa.gov/example', fetchedAt:null };
const storage = (value) => ({ getItem:()=>value, setItem(){} });
const flare = (date, classType='C1.2') => ({ peakTime:date, classType, link:'https://ccmc.gsfc.nasa.gov/example' });
test('picks the latest valid flare and rejects malformed payloads and deceptive links',()=>{
  const result=normalizeFlare([null,{},flare('bad'),flare('2026-11-13T10:00Z'),{...flare('2026-11-14T09:00Z','X2.1'),link:'https://notnasa.gov/record'}],now);
  assert.equal(result.classification,'X2.1');
  assert.equal(result.sourceUrl,'https://ccmc.gsfc.nasa.gov/tools/DONKI/');
  assert.equal(normalizeFlare({error:'rate limit'}),null);
});
test('successful fresh NASA response stays LIVE even if storage is blocked',async()=>{
  const result=await getSpaceWeather({archive,now,storage:{getItem(){throw Error();},setItem(){throw Error();}},fetcher:async()=>({ok:true,json:async()=>[flare('2026-11-14T09:00Z')]})});
  assert.equal(result.status,'LIVE');assert.equal(result.classification,'C1.2');
});
test('network failure, rate limit, empty feed and corrupt cache use a real ARCHIVE',async()=>{
  for(const fetcher of [async()=>{throw Error('offline');},async()=>({ok:false}),async()=>({ok:true,json:async()=>[]})]){
    const result=await getSpaceWeather({archive,now,storage:storage('{bad'),fetcher});
    assert.equal(result.status,'ARCHIVE');assert.equal(result.occurredAt,'2024-05-10');
  }
});
test('cached records are never mislabeled LIVE and no recent cache triggers a request',async()=>{
  const record={...archive,fetchedAt:'2026-11-14T09:59:00Z'};
  const result=await getSpaceWeather({archive,now,storage:storage(JSON.stringify(record)),fetcher:async()=>{throw Error('must not fetch');}});
  assert.equal(result.status,'ARCHIVE');assert.equal(result.classification,'G5');
  assert.equal(WEATHER_CACHE_KEY,'somehow-alive-donki-v1');
});
test('failed refresh preserves the last saved NASA record',async()=>{
  const record={...archive,classification:'M3.0',fetchedAt:'2026-11-13T00:00Z'};
  const result=await getSpaceWeather({archive,now,storage:storage(JSON.stringify(record)),fetcher:async()=>({ok:false})});
  assert.equal(result.status,'ARCHIVE');assert.equal(result.classification,'M3.0');
});
