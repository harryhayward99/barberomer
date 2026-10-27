const {test}=require('node:test');
const assert=require('node:assert/strict');
const s=require('../.management-test/security.js');
const now=Date.parse('2026-10-21T12:00:00Z');
const secret='a'.repeat(64);
const pair=n=>({reschedule:`https://api.leadconnectorhq.com/test/reschedule/${n}`,cancel:`https://api.leadconnectorhq.com/test/cancel/${n}`});
const record=n=>s.parseRegistration({locationId:s.LOCATION_ID,appointments:[pair(n)]},now);
test('issuer requires exact nonempty bearer credential',()=>{
 assert.equal(s.authorised(null,secret),false);
 assert.equal(s.authorised('Bearer '+secret,secret),true);
 assert.equal(s.authorised('Bearer '+'b'.repeat(64),secret),false);
 assert.equal(s.authorised('Bearer ',''),false);
});
test('different bookings and family groups cannot share a token',()=>{
 const a=record('dad'),b=record('son');
 const family=s.parseRegistration({locationId:s.LOCATION_ID,appointments:[pair('dad'),pair('son')]},now);
 assert.notEqual(s.tokenFor(a,secret),s.tokenFor(b,secret));
 assert.notEqual(s.tokenFor(a,secret),s.tokenFor(family,secret));
 assert.equal(s.tokenFor(a,secret),s.tokenFor(record('dad'),secret));
 assert.notEqual(s.tokenFor(a,secret),s.tokenFor(a,'b'.repeat(64)));
});
test('only specified appointments can be selected',()=>{
 const a=record('dad');
 assert.equal(s.destinationFor(a,'0','cancel',now),pair('dad').cancel);
 for(const i of ['1','-1','0/../1','00','6']) assert.equal(s.destinationFor(a,i,'cancel',now),null);
 assert.equal(s.destinationFor(a,'0','delete',now),null);
 assert.equal(s.destinationFor(a,'0','cancel',a.expiresAt),null);
});
test('invalid links, external redirects, unresolved fields rejected',()=>{
 for(const u of ['http://api.leadconnectorhq.com/a','https://evil.example/a','https://api.leadconnectorhq.com.evil.example/a','https://user@api.leadconnectorhq.com/a','javascript:alert(1)','{{appointment.reschedule_link}}','https://api.leadconnectorhq.com/a#token']) assert.throws(()=>s.safeDestination(u));
 assert.throws(()=>s.parseRegistration({locationId:'another-account',appointments:[pair('1')]},now));
 assert.throws(()=>s.parseRegistration({locationId:s.LOCATION_ID,appointments:[pair('1'),pair('1')]},now));
});
test('tokens cannot be used for path traversal or raw record lookup',()=>{
 for(const t of ['../secret','', 'x'.repeat(25),'x'.repeat(23)]) assert.equal(s.tokenPath(t),null);
 const t=s.tokenFor(record('dad'),secret);
 assert.match(s.tokenPath(t),/^booking-management\/[a-f0-9]{64}\.json$/);
});

test('management forms require the same trusted new or legacy origin',()=>{
 for (const origin of ['https://barberomer.co.uk','https://barberomer.vercel.app']) {
  assert.equal(s.validManagementOrigin(origin, origin+'/m/token/0/cancel'),true);
 }
 for (const origin of [null,'null','https://evil.example','https://barberomer.co.uk.evil.example','http://barberomer.co.uk']) {
  assert.equal(s.validManagementOrigin(origin,'https://barberomer.co.uk/m/token/0/cancel'),false);
 }
 assert.equal(s.validManagementOrigin('https://barberomer.vercel.app','https://barberomer.co.uk/m/token/0/cancel'),false);
 assert.equal(s.SITE,'https://barberomer.co.uk');
});
