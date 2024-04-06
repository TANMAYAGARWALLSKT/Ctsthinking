const page1 = document.querySelector("#page3");
const container = document.querySelector(".hi");
const page2 = document.querySelector("#page2");
const container1 = document.querySelector("#container1");
const containerWidth = container.clientWidth;
const page1Width = page1.clientWidth;
const flipcardcontainer = document.querySelector("#flipcardcontainer");
let cont = document.querySelector("#warp");

function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
// locomotive();

function bhaikaLoader() {
  gsap.to(".loader", {
    top: "-100vh",
    duration: 1.5,
    ease: "Expo.inOut",
    delay: 1,
  });
}
bhaikaLoader();

gsap.to(".hi", {
  x: page1Width - containerWidth,
  ease: "power1.inOut",
  scrollTrigger: {
    scroller: "body",
    trigger: ".page3",
    start: "top 0",
    pin: ".page3",
    scrub: true,
    // markers: true,
  },
});
function videopage() {
  const texts = [
    "THINK CREATIVELY",
    "THINK OUT OF THE BOX",
    "EXPLORE MORE",
    "GO WILD",
    "EXCLUSIVE",
    "INTERACTIVE",
    "SMARTWORK",
  ];

  function generateTextPop() {
    const textElement = document.createElement("span");
    textElement.classList.add("text-pop");
    textElement.textContent = texts[Math.floor(Math.random() * texts.length)];

    // Generate random position within the background
    const xPos = Math.random() * (window.innerWidth - textElement.clientWidth);
    const yPos =
      Math.random() * (window.innerHeight - textElement.clientHeight);
    textElement.style.left = `${xPos}px`;
    textElement.style.top = `${yPos}px`;

    document.querySelector(".background").appendChild(textElement);

    // Simulate a delay before removing the element (adjust as needed)
    setTimeout(() => {
      textElement.remove();
    }, 2000);
  }

  // Call the function to generate text pops at intervals
  setInterval(generateTextPop, 1000); // Creates a text pop every second
}
videopage();
function autoplay() {
  document.querySelector("video").autoplay = true;
  document.querySelector("video").loop = true;
  document.querySelector("video").muted = true;
  // document.querySelector("video").controls = true;
}
autoplay();
