
let tasks = [];
let moodData = [];
const taskList = document.getElementById("taskList");
const form = document.getElementById("taskForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("taskName").value;
    const time = parseInt(document.getElementById("taskTime").value);
    const mood = parseInt(document.getElementById("taskMood").value);
    tasks.push({ name, time });
    if (mood >= 1 && mood <= 5) moodData.push({ date: new Date().toLocaleDateString(), mood });
    renderTasks();
    form.reset();
});

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${task.name} - ${task.time}分鐘`;
        taskList.appendChild(li);
    });
}

function generateReport() {
    const report = document.getElementById("report");
    if (moodData.length === 0) {
        report.textContent = "沒有心情資料。";
        return;
    }
    const average = (moodData.reduce((sum, item) => sum + item.mood, 0) / moodData.length).toFixed(2);
    const grouped = {};
    moodData.forEach(item => {
        if (!grouped[item.date]) grouped[item.date] = 0;
        grouped[item.date] += item.mood;
    });
    const tiredDay = Object.entries(grouped).sort((a,b) => b[1] - a[1])[0][0];
    report.innerHTML = `📈 平均心情：${average}<br/>😩 最累的一天：${tiredDay}`;
}

function downloadChart() {
    alert("這裡可以未來加上 Chart.js 圖表並轉成圖片下載功能！");
}
