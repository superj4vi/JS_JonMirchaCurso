const d=document,
$shows=d.getElementById("shows");
$template=d.getElementById("shows_template").content,
$fragment=d.createDocumentFragment();

d.addEventListener("keypress",async e =>{
  if(e.target.matches("#search")){

    if (e.key==="Enter") {
      try {
        $shows.innerHTML=`<img class="loader" src="../assets/loader.svg" alt="Cargando...">`;

        let query= e.target.value.toLowerCase(),
        api=`http://api.tvmaze.com/search/shows?q=${query}`,
        res= await fetch(api),
        json= await res.json();

        //console.log(api,res,json);
        if (!res.ok) throw{status: res.status, statusText:res.statusText};
        if(json.length===0){
          $shows.innerHTML=`<h2>No Existen resultado de shows para el criterio de busqueda: <mark>${query}</mark></h2>`;
        }else{
          json.forEach(el=>{
            $template.querySelector('h3').textContent=el.show.name;
            $template.querySelector('div').innerHTML=el.show.summary?el.show.summary:"Sin Descripción";
            $template.querySelector('img').src=el.show.image?el.show.image.medium:"http://static.tvmaze.com/images/no-img/no-img-portrait-text.png";

              let $clone= d.importNode($template,true);
              $fragment.appendChild($clone);
          });

          $shows.innerHTML="";
          $shows.appendChild($fragment);
        }

      } catch (err) {
        console.log(err);
        let message=err.statusText||"Ocurrio un Error";
        $shows.innerHTML=`<p>Error ${err.status}: ${message}</p>`;
      }
    }
  }
});