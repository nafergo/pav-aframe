
let history = "Il processo formativo dell'insediamento gesuitico a l'Aquila risulta piuttosto lungo e complesso. Il progetto dei gesuiti per realizzare nel cuore dell'Aquila un collegio con annessa chiesa risale alla seconda meta' del Cinquecento ma l'iter progettuale incontro' numerose difficolta' che posticiparono l'inizio dei lavori e finirono per limitare l'impatto urbanistico-architettonico originario dell'intervento. La vicenda urbanistica-edilizia inizia il 9 ottobre 1592, con l'assegnazione ai gesuiti delle case Camponeschi. Solo nel 1597, dopo circa trent'anni di trattative e grazie all'appoggio delle autorita' civili e religiose, l'ordine riusci' a rilevare l'antico palazzo della Camera e la vicina chiesa in piazza Santa Margherita per installarvi il collegio e nel 1598-1599 cominciarono i lavori per l'adeguamento dei fabbricati. Le proposte per la costruzione di una nuova chiesa in sostituzione della precedente cominciarono gia' a partire dalla fine del XVI secolo e si protrassero per lungo tempo.";

history = history.split(" ");
let historyPages = [];
for(let start = 0, n_words = 135; start < history.length; start = start + n_words) {
  if (start + n_words < history.length) {
    historyPages.push(history.slice(start, start + n_words).join(" ") + ' ...');
  }
  else {
    historyPages.push(history.slice(start, history.length).join(" "));
  }
}
let currentIndexHistory = 0;

AFRAME.registerComponent('basic-material', {
  init: function (){
    var material = new THREE.MeshBasicMaterial({color: this.el.getAttribute('color')});
    var geometry = this.el.getObject3D('mesh').geometry;
    this.el.setObject3D('mesh', new THREE.Mesh(geometry, material));
  },
  remove: function(){
    this.el.removeObject3D('mesh');
  }
});

AFRAME.registerComponent('show-history', {
  init: function(){
    this.el.addEventListener('click', function(event){
      document.querySelector('.history').setAttribute('visible', true);
      if (historyPages.length > 1) {
        document.querySelector('[go-forward-history]').setAttribute('visible', true);
      }
      else {
        document.querySelector('[go-forward-history]').setAttribute('visible', false);
      }
      document.querySelector('[go-backward-history]').setAttribute('visible', false);
      currentIndexHistory = 0;
      document.querySelector('.history').setAttribute('value', historyPages[currentIndexHistory]);
    })
  }
});

AFRAME.registerComponent('go-backward-history', {
  init: function(){
    this.el.addEventListener('click', (event) => {
      if (currentIndexHistory > 0) {
        currentIndexHistory--;
        document.querySelector('[go-forward-history]').setAttribute('visible', true);
        if (currentIndexHistory == 0) {
          this.el.setAttribute('visible', false);
        }
      }
      document.querySelector('.history').setAttribute('value', historyPages[currentIndexHistory]);
    })
  }
});

AFRAME.registerComponent('go-forward-history', {
  init: function(){
    this.el.addEventListener('click', (event) => {
      if (currentIndexHistory < historyPages.length - 1) {
        currentIndexHistory++;
        document.querySelector('[go-backward-history]').setAttribute('visible', true);
        if (currentIndexHistory == historyPages.length - 1) {
          this.el.setAttribute('visible', false);
        }
      }
      document.querySelector('.history').setAttribute('value', historyPages[currentIndexHistory]);
    })
  }
});

AFRAME.registerComponent('hide-history', {
  init: function(){
    this.el.addEventListener('click', function(event){
      currentIndexHistory = 0;
      document.querySelector('.history').setAttribute('visible', false);
      document.querySelector('.history').setAttribute('value', '');
    })
  }
});
