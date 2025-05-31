// Основные функции управления интерфейсом
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const isVisible = section.classList.contains('visible');

    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('visible');
        s.classList.add('hidden');
        s.style.display = 'none';
    });

    if (!isVisible) {
        section.classList.remove('hidden');
        section.classList.add('visible');
        section.style.display = 'block';
        setTimeout(() => section.style.opacity = '1', 50);
        window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
    }
}

function hideAllSections(event) {
    if (event) event.preventDefault();
    document.querySelectorAll('.section').forEach(s => {
        s.classList.add('hidden');
        s.classList.remove('visible');
        s.style.display = 'none';
        s.style.opacity = '0';
        s.style.visibility = 'hidden';
    });
    return false;
}

function toggleCategory(categoryId) {
    document.getElementById('tasksList').classList.add('hidden');
    document.getElementById(`${categoryId}-tasks`).classList.remove('hidden');
    document.getElementById(`${categoryId}-tasks`).classList.add('visible');
}

function showCategoryList() {
    document.querySelectorAll('.category-tasks').forEach(ct => {
        ct.classList.add('hidden');
        ct.classList.remove('visible');
    });
    document.getElementById('tasksList').classList.remove('hidden');
    document.getElementById('tasksList').classList.add('visible');
}

function toggleTask(taskId) {
    const taskElement = document.getElementById(taskId);
    const isVisible = taskElement.classList.contains('visible');

    document.querySelectorAll('.task-content').forEach(task => {
        task.classList.add('hidden');
        task.classList.remove('visible');
        task.style.display = 'none';
    });

    if (!isVisible) {
        taskElement.classList.remove('hidden');
        taskElement.classList.add('visible');
        taskElement.style.display = 'block';
        setTimeout(() => taskElement.style.opacity = '1', 50);
    }
}

function toggleSubgroup(subgroupId) {
    const mainGroups = document.getElementById('uebungen-groups');
    const currentSubgroup = document.getElementById(`${subgroupId}-subgroup`);
    const isAlreadyVisible = currentSubgroup.classList.contains('visible');

    document.querySelectorAll('.category-list').forEach(list => {
        if (list.id.endsWith('-subgroup')) {
            list.classList.add('hidden');
            list.classList.remove('visible');
            list.style.display = 'none';
        }
    });

    if (isAlreadyVisible) {
        mainGroups.classList.remove('hidden');
        mainGroups.classList.add('visible');
        mainGroups.style.display = 'grid';
    } else {
        currentSubgroup.classList.remove('hidden');
        currentSubgroup.classList.add('visible');
        currentSubgroup.style.display = 'grid';
        mainGroups.classList.add('hidden');
        setTimeout(() => {
            currentSubgroup.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Видео функции
const videoLeft = document.getElementById('videoLeft');
const videoRight = document.getElementById('videoRight');
const videoWrapper = document.getElementById('dualVideoWrapper');

function playTwoVideos(file1, file2) {
    stopVideos();
    videoLeft.querySelector('source').src = file1;
    videoRight.querySelector('source').src = file2;
    videoLeft.load();
    videoRight.load();
    videoWrapper.style.display = 'flex';
    videoWrapper.classList.add('visible');
}

function playVideo(file) {
    console.log("Playing video:", file);
    alert(`Видео "${file}" будет загружено на реальном сервере`);
}

function stopVideos() {
    videoLeft.pause();
    videoRight.pause();
    videoLeft.currentTime = 0;
    videoRight.currentTime = 0;
    videoWrapper.style.display = 'none';
    videoWrapper.classList.remove('visible');
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href*="file://"]').forEach(link => {
        link.href = '#';
        link.onclick = (e) => {
            e.preventDefault();
            const taskId = link.closest('.task-content')?.id;
            if (taskId) toggleTask(taskId);
            return false;
        };
    });

    if (videoWrapper) {
        videoWrapper.style.display = 'none';
        videoWrapper.classList.remove('visible');
    }
});
