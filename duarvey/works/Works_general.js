const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')
const desktopSidebar = window.matchMedia('(min-width: 801px)')

function syncSidebarMode(){
    sidebar.classList.toggle('auto-hide', desktopSidebar.matches && !sidebar.classList.contains('open'))
}

syncSidebarMode()
desktopSidebar.addEventListener('change', syncSidebarMode)

function toggleSidebar(){
    const isOpen = sidebar.classList.toggle('open')
    toggleButton.classList.toggle('rotate', isOpen)
    sidebar.classList.toggle('auto-hide', desktopSidebar.matches && !isOpen)

    closeAllSubMenus()
}


function toggleSubMenu(button){

    if(!button.nextElementSibling.classList.contains('show')){
        closeAllSubMenus()
    }
     
    

    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')

    if(!sidebar.classList.contains('open')){
        sidebar.classList.add('open')
        sidebar.classList.remove('auto-hide')
        toggleButton.classList.add('rotate')
    }

}

function closeAllSubMenus(){ 
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show')
        ul.previousElementSibling.classList.remove('rotate')
    })}