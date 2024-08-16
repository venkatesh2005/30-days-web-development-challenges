document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const closeMenu = document.querySelector('.close-menu');
    const menuList = document.querySelector('.menu-list');
  
    hamburger.addEventListener('click', () => {
      menuList.classList.add('active');
      hamburger.style.display = 'none'; 
      closeMenu.style.display = 'block'; 
    });
  
    closeMenu.addEventListener('click', () => {
      menuList.classList.remove('active');
      hamburger.style.display = 'block'; 
      closeMenu.style.display = 'none'; 
    });
  });
  