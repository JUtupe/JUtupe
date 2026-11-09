// Fallback Blockbench MCP client (when mcp__blockbench__* tools aren't loaded in the session).
// Usage: node scripts/bb-mcp.mjs --list | node scripts/bb-mcp.mjs <tool> '<json args>' | node scripts/bb-mcp.mjs <tool> @args.json
// Image results are written to $IMG (default shot.png).
const URL=process.env.BB_MCP_URL||'http://localhost:3333/bb-mcp';
const H={'Content-Type':'application/json','Accept':'application/json, text/event-stream'};
async function rpc(sid,body){const r=await fetch(URL,{method:'POST',headers:{...H,...(sid?{'mcp-session-id':sid}:{})},body:JSON.stringify(body)});
 const t=await r.text(); const j=t.startsWith('{')?JSON.parse(t):JSON.parse(t.split('\n').filter(l=>l.startsWith('data:')).pop().slice(5)); return [r.headers.get('mcp-session-id')||sid,j];}
let [sid]=await rpc(null,{jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'claude-cli',version:'1'}}});
await fetch(URL,{method:'POST',headers:{...H,'mcp-session-id':sid},body:JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})});
const [a,b]=process.argv.slice(2);
if(a==='--list'){const[,j]=await rpc(sid,{jsonrpc:'2.0',id:2,method:'tools/list'});for(const t of j.result.tools)console.log(t.name+' :: '+(t.description||'').slice(0,140).replace(/\n/g,' ')+'\n   '+JSON.stringify(Object.keys(t.inputSchema?.properties||{})));}
else{const args=b?.startsWith('@')?JSON.parse((await import('fs')).readFileSync(b.slice(1),'utf8')):JSON.parse(b||'{}');
 const[,j]=await rpc(sid,{jsonrpc:'2.0',id:3,method:'tools/call',params:{name:a,arguments:args}});
 if(j.error)console.log('ERR',JSON.stringify(j.error));else for(const c of j.result.content){if(c.type==='text')console.log(c.text);else if(c.type==='image'){const f=process.env.IMG||'shot.png';(await import('fs')).writeFileSync(f,Buffer.from(c.data,'base64'));console.log('image ->',f);}}}
