document.addEventListener('DOMContentLoaded', function(){
    const tambah = document.getElementById('tambahkan');
    // const checkbox = document.getElementById('checkbox').checked;
    // // tambah.addEventListener('submit' ,function(event){
    // //     event.preventDefault();
    // //     buku();
    // //  });
    tambah.addEventListener('submit' , function(event){
        event.preventDefault();
        buku()
     });

    if(isStorageExist()){
        loadDataFormStorage();
    }
})

function buku(){
    const judul = document.getElementById('Judul').value;
    const penulis = document.getElementById('Penulis').value;
    const tahun = document.getElementById('Tahun').value;
    const checkbox = document.getElementById('checkbox').checked;
    checkbox.checked == true
    // if(checkbox.checked == true){
    //     belomSelesaiListBuku(objekBuku.id);
    //  }   
    //  else{  
    //     alert('')
    //  }
    const generateID = buatId();
    const objekBuku = objekBukuSejah( generateID , judul , penulis , Number(tahun) , checkbox , false);
    totos.push(objekBuku);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData()
}

function buatId(){
    return + new Date()
}
 
function objekBukuSejah(id , title , author , year , isComplate){
    return{
        id, 
        title,
        author,
        year,
        isComplate
    }
}

const totos = [];
const RENDER_EVENT = 'render-buku';//masalah utama

document.addEventListener(RENDER_EVENT , function(){
    console.log(totos);
    // const belomSelesaiListBuku = document.getElementById('totos')
    // belomSelesaiListBuku.innerHTML = ''
    //  for(const bukuItem of totos){
    //     const bukuElement = buatBuku(bukuItem)
    //     belomSelesaiListBuku.append(bukuElement)
    //  }
});


function buatBuku(objekBuku){
    const title = document.createElement('h2');
    title.innerText = objekBuku.title;
    const writis = document.createElement('h2');
    writis.innerText = objekBuku.author;
    const year = document.createElement('p');
    year.innerText = objekBuku.year;
    const Teks = document.createElement('div');
    Teks.classList.add('nyatu');
    Teks.append(title , writis , year);

    //dini buat css
    const wrap = document.createElement('div');
    wrap.classList.add('buku' , 'item');
    wrap.append(Teks);
    wrap.setAttribute('id' , `totos-${objekBuku.id}`);

    
 

     if(objekBuku.isComplate){
        const back = document.createElement('button');
        back.classList.add('tombol-ulang');
        back.innerHTML="buang"

        back.addEventListener('click' , function(){
            hapusTugasDariSudah(objekBuku.id);
        });

        const buang = document.createElement('button');
        buang.classList.add('tombol-buang');
        buang.innerHTML="belum dibaca"

        buang.addEventListener('click' , function(){
            belomSelesaiListBuku(objekBuku.id);
        });
       

        wrap.append(back , buang);
     }
     else{
        const cek = document.createElement('button');
        cek.classList.add('cek-aja');
        cek.innerHTML="sudah dibaca"

        cek.addEventListener('click' , function(){
            tugasSeleai(objekBuku.id);
        });

        const back = document.createElement('button');
        back.classList.add('tombol-ulang');
        back.innerHTML="buang"

        back.addEventListener('click' , function(){
            hapusTugasDariSudah(objekBuku.id);
        });
       
        wrap.append(cek, back);
     }

     return wrap;
     
     document.dispatchEvent(new Event(RENDER_EVENT)); 
     saveData();  

}

function tugasSeleai(totosId){
    const bukuTarget = cariBuku(totosId);

    if(bukuTarget == null)return;
    
    bukuTarget.isComplate = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
    }

    function cariBuku(totosId){
        for(const bukuItem of totos){
            if(bukuItem.id === totosId){
                return bukuItem;
            }
        }
        return null 
    }
    

 document.addEventListener(RENDER_EVENT, function(){
        const belomSelesaiListBuku = document.getElementById('totos');
        belomSelesaiListBuku.innerHTML = '';

        for(const bukuItem of totos){
            const bukuElement = buatBuku(bukuItem)

            if(!bukuItem.isComplate){
                belomSelesaiListBuku.append(bukuElement);
            }
        }
    });

document.addEventListener(RENDER_EVENT , function(){
    const belomSelesaiListBuku = document.getElementById('totos');
    belomSelesaiListBuku.innerHTML = '';

    const sudahSelesaiListBuku = document.getElementById('selesai-totos');
    sudahSelesaiListBuku.innerHTML = '';

    for(const bukuItem of totos){
        const bukuElement = buatBuku(bukuItem);
        if (!bukuItem.isComplate){

            belomSelesaiListBuku.append(bukuElement);
        }
    else{

        sudahSelesaiListBuku.append(bukuElement)
    }
    }

});

function hapusTugasDariSudah(totosId){
    const bukuTarget = cariBukuIndex(totosId);

    if (bukuTarget === -1) return;

    totos.splice(bukuTarget , 1);
    document.dispatchEvent(new Event(RENDER_EVENT));

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function belomSelesaiListBuku(totosId){
    const bukuTarget = cariBuku(totosId);
     if (bukuTarget == null)return;

     bukuTarget.isComplate = false;
     document.dispatchEvent(new Event(RENDER_EVENT));

     document.dispatchEvent(new Event(RENDER_EVENT));
     saveData();
}

function cariBukuIndex(totosId){
    for(const index in totos){
        if (totos[index].id === totosId){
            return index;
        }
    }
    return -1;
}

function saveData(){
    if(isStorageExist()){
        const parsed = JSON.stringify(totos);
        localStorage.setItem(STORAGE_KEY , parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}



const SAVED_EVENT = 'saved-buku';
const STORAGE_KEY = 'APL_BUKU';

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert('isi dlu')
        return false;
    }

    return true
}

document.addEventListener(SAVED_EVENT, function(){
    console.log(localStorage.getItem(STORAGE_KEY))
});

function loadDataFormStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData)

    if (data !== null){
        for(const totosId of data){
            totos.push(totosId);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}