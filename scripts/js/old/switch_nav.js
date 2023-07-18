// Get all the links in the navigation menu
const links = document.querySelectorAll("nav ul li a");

// Add a click event listener to each link
links.forEach(link => {
    link.addEventListener("click", () => {
        // Remove the "current" class from all links
        links.forEach(link => {
        link.removeAttribute("id");
        });

        // Add the "current" class to the clicked link
        link.setAttribute("id", "current");
    });
});