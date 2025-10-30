// script.js — Часть 5.1: Мобильное меню
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});