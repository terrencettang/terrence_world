      //
      function check_currentclass(class_name) {
        const links = document.querySelectorAll("nav#nav ul li a");
        const target = document.querySelector("nav#nav ul li a." + class_name);
        if (target.getAttribute("id") === null) {
          links.forEach(link => {
            link.removeAttribute("id");
          })
          target.setAttribute("id" , "current")
        };
      }
      