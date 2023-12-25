document.addEventListener('DOMContentLoaded', function() {
    const files = [
        {
            type: "pdf",
            name: "Супер важный PDF-файл с расписанием на 2023 год",
            creator: "Создал: Дьяков Дмитрий",
            image: "/img/pdf.svg",
            time: "13.03.2023",
          },
          {
            type: "doc",
            name: "Критерии оценки на экзамене в 2023 году",
            creator: "Создал: Дьяков Дмитрий",
            image: "/img/doc.svg",
            time: "13.02.2023",
          },
          {
            type: "xls",
            name: "Табличка со списком покупок",
            creator: "Создал: Дьяков Дмитрий",
            image: "/img/xls.svg",
            time: "13.12.2023",
          },
          {
            type: "png",
            name: "Фотка с отпуска, в который я так хочу вернуться…",
            creator: "Создал: Дьяков Дмитрий",
            image: "/img/png.svg",
            time: "13.06.2023",
          },
    ];
  
    const container = document.getElementById('fileContainer');
    const sortSelect = document.getElementById('sortSelect');
  
    function formatDate(dateString) {
      let [day, month, year] = dateString.split('.').map(Number);
      return new Date(year, month - 1, day);
    }
  
    function renderFiles(sortOption, filterType) {
      container.innerHTML = '';
  
      let filteredFiles = [...files];
  
      if (filterType && filterType !== 'all') {
        filteredFiles = filteredFiles.filter(file => file.type === filterType);
      }
  
      if (sortOption === 'newest') {
        filteredFiles.sort((a, b) => formatDate(b.time) - formatDate(a.time));
      } else if (sortOption === 'oldest') {
        filteredFiles.sort((a, b) => formatDate(a.time) - formatDate(b.time));
      }
  
      filteredFiles.forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.className = 'file-card';
  
        const fileImage = document.createElement('img');
        fileImage.src = file.image;
        fileImage.alt = file.type;
        fileImage.className = 'file-image'; // Добавлен класс для стилей
  
        const textContainer = document.createElement('div');
        textContainer.className = 'file-text';
  
        const fileName = document.createElement('p');
        fileName.textContent = file.name;
        fileName.className = 'file-name';
        
  
        const creatorInfo = document.createElement('p');
        creatorInfo.textContent = file.creator;
        
  
        const lastChangeInfo = document.createElement('p');
        lastChangeInfo.textContent = `Последнее изменение: ${formatDate(file.time).toLocaleDateString('ru-RU')}`;
  
        textContainer.appendChild(fileName);
        textContainer.appendChild(creatorInfo);
        textContainer.appendChild(lastChangeInfo);
  
        fileElement.appendChild(fileImage);
        fileElement.appendChild(textContainer);

    

  
        container.appendChild(fileElement);
      });
    }
  
    // Обработчик изменения выбора сортировки
    sortSelect.addEventListener('change', function() {
      const selectedType = document.querySelector('.filter-btn.active').getAttribute('data-type');
      renderFiles(sortSelect.value, selectedType);
    });
  
    // Обработчик нажатия на кнопки фильтрации по типу
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
  
        const selectedType = this.getAttribute('data-type');
        renderFiles(sortSelect.value, selectedType);
      });
    });
  
    // Инициализация: отобразить файлы по умолчанию
    renderFiles('default', 'all');
  });
  