/* Bubble Mind Stage 5 — OpenRouter model discovery.
   Model catalog is fetched only on click; API key remains in session memory. */
(()=>{'use strict';
 const API='https://openrouter.ai/api/v1';
 const getKey=()=>window.BubbleMindStudioBridge?.getAI?.()?.key||'';
 const pricePerMillion=value=>{
  if(value==null||value==='')return null;
  const n=Number(value);
  return Number.isFinite(n)&&n>=0?n*1e6:null;
 };
 const money=n=>{
  if(n==null)return '?';
  if(n===0)return '$0';
  return '$'+n.toLocaleString('en-US',{maximumFractionDigits:n<.01?4:n<1?3:2});
 };
 const isFree=m=>m.id.endsWith(':free')||
  (pricePerMillion(m.pricing?.prompt)===0&&pricePerMillion(m.pricing?.completion)===0);
 const price=m=>{
  const p=pricePerMillion(m.pricing?.prompt),c=pricePerMillion(m.pricing?.completion);
  return 'Input '+money(p)+' / Output '+money(c)+' per 1M tokens';
 };
 const formatContext=n=>{
  const v=Number(n);return Number.isFinite(v)&&v>0?(v>=1e6?(v/1e6).toFixed(1)+'M':Math.round(v/1000)+'K'):'?';
 };
 const normalize=data=>{
  if(!data||!Array.isArray(data.data))throw Error('Model catalog returned an unexpected response.');
  const models=[];
  const seen=new Set();
  for(const row of data.data){
   if(!row||typeof row.id!=='string'||!row.id.trim()||seen.has(row.id))continue;
   const inputs=row.architecture?.input_modalities,outputs=row.architecture?.output_modalities;
   if(Array.isArray(inputs)&&!inputs.includes('text'))continue;
   if(Array.isArray(outputs)&&!outputs.includes('text'))continue;
   seen.add(row.id);
   models.push({id:row.id,name:typeof row.name==='string'&&row.name?row.name:row.id,
    pricing:row.pricing||{},context_length:row.context_length||0});
  }
  return models.sort((a,b)=>a.name.localeCompare(b.name)||a.id.localeCompare(b.id));
 };
 const make=(tag,cls,text)=>{
  const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;
 };
 function mount(modelInput){
  if(!modelInput||modelInput.dataset.modelPickerMounted==='1')return;
  modelInput.dataset.modelPickerMounted='1';
  const host=modelInput.parentElement;
  if(!host?.parentElement)return;
  const panel=make('div','or-model-picker'),buttons=make('div','or-model-buttons');
  const load=make('button','soft-button','Load My Models'),publicList=make('button','soft-button','All Models');
  load.type='button';publicList.type='button';
  load.title='Fetch the models allowed by your OpenRouter key and account settings';
  publicList.title='Browse all text-capable models in OpenRouter, including those you may not be able to use';
  buttons.append(load,publicList);
  const status=make('p','or-model-status','Enter your API key, then press Load My Models.');
  status.setAttribute('role','status');
  const filters=make('div','or-model-filters');
  const search=make('input','or-model-search');
  search.type='search';search.placeholder='Search model names or IDs';search.setAttribute('aria-label','Search OpenRouter models');
  const freeLabel=make('label','or-model-free'),free=make('input');
  free.type='checkbox';freeLabel.append(free,document.createTextNode(' Free only'));
  filters.append(search,freeLabel);
  const select=make('select','or-model-select');
  select.setAttribute('aria-label','Select an OpenRouter AI model');
  const details=make('p','or-model-details');
  panel.append(buttons,status,filters,select,details);
  host.parentElement.insertBefore(panel,host.nextSibling);
  filters.hidden=true;select.hidden=true;details.hidden=true;
  let models=[],scope='',active=null;
  function render(){
   select.replaceChildren();
   const term=search.value.trim().toLocaleLowerCase();
   const matches=models.filter(m=>(!free.checked||isFree(m))&&
    (!term||m.name.toLocaleLowerCase().includes(term)||m.id.toLocaleLowerCase().includes(term)));
   const limit=100;
   const placeholder=make('option','',matches.length?'Choose a model ('+matches.length+' match'+(matches.length===1?'':'es')+')':'No models match your filters');
   placeholder.value='';select.append(placeholder);
   for(const m of matches.slice(0,limit)){
    const opt=make('option','',(isFree(m)?'FREE · ':'')+m.name+' — '+m.id);
    opt.value=m.id;select.append(opt);
   }
   if(models.some(m=>m.id===modelInput.value)&&matches.some(m=>m.id===modelInput.value))select.value=modelInput.value;
   else select.value='';
   status.textContent=(scope==='account'?'Account-filtered models':'Public model catalog')+
    ': '+models.length+' text models · '+matches.length+' match'+(matches.length===1?'':'es')+
    (matches.length>limit?'. Showing first '+limit+' — search to narrow.':'.');
   details.textContent='Select a model to see price and context window. Costs are OpenRouter estimates in USD.';
  }
  function choose(){
   const selected=models.find(m=>m.id===select.value);if(!selected)return;
   modelInput.value=selected.id;
   modelInput.dispatchEvent(new Event('input',{bubbles:true}));
   modelInput.dispatchEvent(new Event('change',{bubbles:true}));
   details.textContent=selected.name+' · '+(isFree(selected)?'Free listed pricing':'Paid or usage-priced')+
    ' · '+price(selected)+' · Context '+formatContext(selected.context_length)+' tokens';
  }
  async function fetchModels(kind){
   if(active)active.abort();
   const key=getKey();
   if(kind==='account'&&!key){status.textContent='Enter your OpenRouter API key before loading account models.';return}
   const controller=new AbortController();active=controller;
   load.disabled=true;publicList.disabled=true;status.textContent='Loading '+(kind==='account'?'your available models':'the public model catalog')+'…';
   try{
    const endpoint=kind==='account'?API+'/models/user':API+'/models';
    const headers={Accept:'application/json'};
    if(key)headers.Authorization='Bearer '+key;
    const response=await fetch(endpoint,{method:'GET',mode:'cors',headers,signal:controller.signal,cache:'no-store'});
    if(!response.ok){
     let reason='';
     try{const d=await response.json();reason=d?.error?.message||d?.message||''}catch(_){}
     throw Error('OpenRouter HTTP '+response.status+(reason?': '+String(reason).slice(0,170):''));
    }
    const catalog=normalize(await response.json());
    if(!catalog.length)throw Error('No text-chat models were returned for this catalog.');
    models=catalog;scope=kind;search.value='';free.checked=false;
    filters.hidden=false;select.hidden=false;details.hidden=false;
    render();
   }catch(err){
    if(controller.signal.aborted)return;
    status.textContent='Unable to load models: '+String(err?.message||err).slice(0,220)+
      (kind==='account'?' You can try All Models, or keep typing a model ID manually.':' You can still enter a model ID manually.');
   }finally{
    if(active===controller){active=null;load.disabled=false;publicList.disabled=false}
   }
  }
  load.addEventListener('click',()=>fetchModels('account'));
  publicList.addEventListener('click',()=>fetchModels('public'));
  search.addEventListener('input',render);
  free.addEventListener('change',render);
  select.addEventListener('change',choose);
  modelInput.addEventListener('input',()=>{
   if(!models.length)return;
   const selected=models.find(m=>m.id===modelInput.value);
   select.value=selected?.id||'';
  });
 }
 window.BubbleMindModelPicker=Object.freeze({mount});
})();