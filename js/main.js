document.addEventListener('DOMContentLoaded', () => {

	// --- 1. UI: Липкая шапка и Мобильное меню ---
	const header = document.querySelector('header');
	const hamburger = document.querySelector('.hamburger');
	const navMenu = document.querySelector('.nav-menu');

	// Sticky Header
	window.addEventListener('scroll', () => {
		if (window.scrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});

	// Mobile Menu Toggle
	if (hamburger) {
		hamburger.addEventListener('click', () => {
			hamburger.classList.toggle('active');
			navMenu.classList.toggle('active');
		});
		// Закрыть меню при клике на ссылку
		document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
			hamburger.classList.remove('active');
			navMenu.classList.remove('active');
		}));
	}

	// --- 2. Анимации появления (Scroll Reveal) ---
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = 1;
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, { threshold: 0.1 });

	document.querySelectorAll('.card, h2, .fade-in, .master-card, .price-row').forEach(el => {
		el.style.opacity = 0;
		el.style.transform = 'translateY(30px)';
		el.style.transition = 'all 0.6s ease-out';
		observer.observe(el);
	});

	// --- 3. Lightbox (Галерея) ---
	const galleryGrid = document.getElementById('galleryGrid');
	const lightbox = document.getElementById('lightbox');

	if (galleryGrid && lightbox) {
		const lightboxImg = document.getElementById('lightboxImg');
		const lightboxClose = document.getElementById('lightboxClose');

		galleryGrid.addEventListener('click', (e) => {
			if (e.target.tagName === 'IMG') {
				lightboxImg.src = e.target.src;
				lightbox.classList.add('open');
			}
		});

		lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
		lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
	}

	// --- 4. Логика Бронирования ---
	const bookingForm = document.getElementById('bookingForm');
	if (bookingForm && typeof CENTRAL_DATA !== 'undefined') {
		initBookingLogic(bookingForm);
	}
});

function initBookingLogic(bookingForm) {
	const branchSelect = document.getElementById('branchSelect');
	const barberSelect = document.getElementById('barberSelect');
	const serviceSelect = document.getElementById('serviceSelect');
	const dateInput = document.getElementById('dateInput');
	const timeInput = document.getElementById('timeInput');
	const phoneInput = document.getElementById('phoneInput'); // Нужно добавить этот input в HTML

	// А. Ограничение даты (Нельзя выбрать прошлое)
	const today = new Date().toISOString().split('T')[0];
	dateInput.setAttribute('min', today);

	// Б. Заполняем Selects
	CENTRAL_DATA.branches.forEach(branch => {
		const option = document.createElement('option');
		option.value = branch.id;
		option.textContent = branch.name;
		branchSelect.appendChild(option);
	});

	CENTRAL_DATA.services.forEach(service => {
		const option = document.createElement('option');
		option.value = service.name;
		option.textContent = `${service.name} — ${service.price}`;
		serviceSelect.appendChild(option);
	});

	// В. Обновление барберов
	branchSelect.addEventListener('change', (e) => {
		const branchId = e.target.value;
		barberSelect.innerHTML = '<option value="" disabled selected>Выберите мастера</option>';
		barberSelect.disabled = true;

		const branchData = CENTRAL_DATA.branches.find(b => b.id === branchId);
		if (branchData) {
			barberSelect.disabled = false;
			// Сортировка TOP выше
			const sortedBarbers = [...branchData.barbers].sort((a, b) => (b.status === 'TOP') - (a.status === 'TOP'));
			sortedBarbers.forEach(barber => {
				const option = document.createElement('option');
				option.value = barber.name;
				option.textContent = `${barber.name} ${barber.status === 'TOP' ? '★' : ''}`;
				barberSelect.appendChild(option);
			});
		}
	});

	// Г. Чтение URL параметров
	const urlParams = new URLSearchParams(window.location.search);
	const preBranch = urlParams.get('branch');
	const preBarber = urlParams.get('barber');
	if (preBranch) {
		branchSelect.value = preBranch;
		// Триггерим событие, чтобы подгрузились мастера
		branchSelect.dispatchEvent(new Event('change'));
		if (preBarber) {
			// Небольшая задержка, чтобы список успел обновиться (хотя тут синхронно, но для надежности)
			setTimeout(() => {
				// Ищем опцию по тексту или value
				for (let i = 0; i < barberSelect.options.length; i++) {
					if (barberSelect.options[i].value === preBarber) {
						barberSelect.selectedIndex = i;
						break;
					}
				}
			}, 10);
		}
	}

	// Д. Отправка формы
	bookingForm.addEventListener('submit', (e) => {
		e.preventDefault();

		// Валидация времени (10:00 - 21:00)
		const selectedTime = timeInput.value;
		const hour = parseInt(selectedTime.split(':')[0]);
		if (hour < 10 || hour >= 22) {
			alert('Мы работаем с 10:00 до 22:00. Пожалуйста, выберите рабочее время.');
			return;
		}

		const branchId = branchSelect.value;
		const branchData = CENTRAL_DATA.branches.find(b => b.id === branchId);
		if (!branchData) return;

		// Данные
		const name = document.getElementById('nameInput').value;
		const phone = document.getElementById('phoneInput').value;
		const comment = document.getElementById('commentInput').value;

		// Форматирование даты
		const dateObj = new Date(dateInput.value);
		const dateStr = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' });

		const message = `
👋 *ЗАЯВКА С САЙТА*

📍 *Филиал:* ${branchData.name}
✂️ *Мастер:* ${barberSelect.value}
💈 *Услуга:* ${serviceSelect.value}

📅 *Дата:* ${dateStr}
⏰ *Время:* ${selectedTime}

👤 *Имя:* ${name}
📱 *Телефон:* ${phone}
${comment ? `💬 *Комментарий:* ${comment}` : ''}
`.trim();

		const whatsappUrl = `https://wa.me/${branchData.whatsapp}?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, '_blank');
	});
}