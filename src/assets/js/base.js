

//url参数获取
var urlData = function(dataName){  
	var getUrlVars = function(){ 
		var vars = [], hash; 
		var hashes = window.location.href.slice(window.location.href.indexOf('?')+1).split('&'); 
		for(var i = 0; i < hashes.length; i++) { 
			hash = hashes[i].split('='); 
			vars.push(hash[0]); 
			vars[hash[0]] = hash[1]; 
		} 
		return vars; 
	} 
	var params = getUrlVars(); 
	for(var i=0;i<params.length;i++){
		if(params[i]==dataName){ 
			return decodeURI(params[params[i]]);
		}
	};
	return false;
};

//数组操作
Array.prototype.getIndex = function(str){
  if(!str)return -1;
  for(var i=0;i<this.length;i++){
    if(this[i] == str)return i;
  }
  return -1;
};



export {
  urlData
}