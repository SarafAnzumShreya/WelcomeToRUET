    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        document.getElementById('popUp').style.display="block";
        document.getElementById('continue').style.display="block";
        document.getElementById('board').style.display="none";
        document.getElementById('text').style.display="none";
        document.getElementById('wall').style.display="none";
        document.getElementById('shadow').style.display="none";
    });
    
    document.getElementById('continue').addEventListener('click', function(event) {
        event.preventDefault();
    
        const name = document.getElementById('name').value;
        const dept = document.getElementById('department').value;
    
        window.location.href = `main_game.html?name=${encodeURIComponent(name)}&dept=${encodeURIComponent(dept)}`;
    });
});
