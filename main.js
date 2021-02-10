'use strict';

//navbar 투명하게

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
console.log(window.scrollY);
console.log('navbarHeight: ${navbarHeight}');
if (window.scrollY>navbarHeight) {
    navbar.classList.add('navbar-dark');
} else {
    navbar.classList.remove('navbar-dark');
}
}) 



//navbar menu 스크롤링

const navbarMenu = document.querySelector('.navbar_menu');
navbarMenu.addEventListener('click', (event) => {
    const target=event.target;
    const link = target.dataset.link;
    if(link==null){
        return;
    }
    navbarMenu.classList.remove('open');
scrollIntoView(link);


});

// navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.nav_toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
navbarMenu.classList.toggle('open');
});

//홈 화면 스크롤링 할 때 투명하게

const home=document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',() => {
    home.style.opacity = 1-window.scrollY/homeHeight;
});

//show arrow up button

const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY>homeHeight/2) {
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
});

//click on the "arrow up" button
arrowUp.addEventListener('click',() => {
    scrollIntoView('#home');
});

//projects
const workBtnContainer=document.querySelector('.work_categories');
const projectContainer=document.querySelector('.work_projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter==null) {
        return;
    }

    //my work 클릭 전으로 만들기

    const active =document.querySelector('.category_btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target:
                    e.target.parentNode;
    e.target.classList.add('selected');
   
    projectContainer.classList.add('anim-out');
   
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if (filter === '*'|| filter === project.dataset.type) {
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
           
        });
     projectContainer.classList.remove('anim-out');  
    }, 300);
});

//contact me button

const homeContactBtn =document.querySelector('.home_contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});



// 모든 섹션 요소와 메뉴 아이템을 가지고 옴.
// intersectionObserver 를 이용해 모든 섹션을 관찰.
// 보여지는 섹션에 해당하는 메뉴 아이템 활성화

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>
    document.querySelector('[data-link="${id}"]'));

    let selectedNavIndex = 0;
    let selectedNavItem = navItems[0];
    function selectNavItem(selected){
        selectedNavItem.classList.remove('active');
        selectedNavItem = selected;
        selectedNavItem.classList.add('active');
    }

    function scrollIntoView(selector){
        const scrollTo= document.querySelector(selector);
        scrollTo.scrollIntoView({behavior: "smooth"});
        selectNavItem(navItems[sectionIds.indexOf(selector)]);
    }

const observerOptions = {
    root:null,
    rootMargin: '0px',
    threshold: 0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.IntersectionRatio > 0) {
            const index = sectionIds.indexOf('#${entry.target.id}');
            
            //스크롤링이 아래로 되어서 페이지가 올라옴
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            }else {
                selectedNavIndex = index - 1;
            } 
        }
    });
};

const observer = new IntersectionObserver(observerCallback,observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    }else if (
        window.scrollY + window.innerHeight ===
        document.body.clientHeight
    ){
        selectedNavIndex = navItems.length - 1;
    }
    selectedNavItem(navItems[selectedNavIndex]);
});
