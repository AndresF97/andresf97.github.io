const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const iconLink = document.querySelectorAll('.nav-link')
const skillsContent = document.getElementsByClassName('skills-content');
const skillsHeader = document.querySelectorAll('.skills-header');
const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');
const modalShow = document.querySelectorAll('.services-modal');
const modalBtns = document.querySelectorAll('.services-button');
const modalClose = document.querySelectorAll('.services-modal-close');
const section = document.querySelectorAll('section[id]');
const themeBtn = document.getElementById('bg-btn')
const darkTheme = 'dark-theme';
const iconTheme = 'uil-toggle-off'
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeBtn.classList.contains(iconTheme) ? 'uil-toggle-off' : 'uil-toggle-on';

navToggle.addEventListener('click',()=>{
    navMenu.classList.add('show-menu')
})

navClose.addEventListener('click',()=>{
    navMenu.classList.remove('show-menu')
})

function iconAction(){
    navMenu.classList.remove('show-menu')
}

iconLink.forEach(link => link.addEventListener('click',iconAction))


function toggleSkills(){
    let itemClass = this.parentNode.className
   
    for(let i = 0; i < skillsContent.length;i++){
        skillsContent[i].className = 'skills-content skills-close'
    }

    if(itemClass === 'skills-content skills-close'){
        this.parentNode.className = 'skills-content skills-open'
    }
}

skillsHeader.forEach((el)=>{
    el.addEventListener('click',toggleSkills)
})


tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
        const target = document.querySelector(tab.dataset.target);

        tabContent.forEach(tabCon=>{
            tabCon.classList.remove('qualification-active')
        })

        target.classList.add('qualification-active')
        tabs.forEach(tab=>{
            tab.classList.remove('qualification-active')
        })
        tab.classList.add('qualification-active')
    })
})


let modal = function(modalClick){
    modalShow[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn,i)=>{
    modalBtn.addEventListener('click',()=>{
        modal(i)
    })
})

modalClose.forEach((close)=>{
    close.addEventListener('click',()=>{
        modalShow.forEach((modal)=>{
            modal.classList.remove('active-modal')
        })
    })
})

let swiper = new Swiper('.swiper-container',{
    cssMode:true,
    loop:true,
    navigation:{
        nextEl:'.swiper-button-next',
        prevEl:'.swiper-button-prev'
    },
    pagination:{
        el:'.swiper-pagination',
        clickable:true
    },
})



function scrollMovement(){
    const scrollYAxis =  window.pageXOffset;
    section.forEach(current=>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offStep - 50;
        const sectionId = current.getAttribute('id')

        if(scrollYAxis > sectionTop && scrollYAxis <= sectionTop + sectionHeight){
            document.querySelector(`.nav-menu a[href*=${sectionId}]`).classList.add('active-link')
        }else{
            document.querySelector(`.nav-menu a[href*=${sectionId}]`).classList.remove('active-link')
        }

    })
}

window.addEventListener('scroll',scrollMovement)




if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeBtn.classList[selectedIcon === 'uil-toggle-off' ? 'add' : "remove"](iconTheme)
}

themeBtn.addEventListener('click',()=>{
    document.body.classList.toggle(darkTheme)
    themeBtn.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme',getCurrentTheme())
    localStorage.setItem('selected-icon',getCurrentIcon)
})