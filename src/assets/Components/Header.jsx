import { useState, useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import Menu from './Menu'
import MenuToggle from './MenuToggle'


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scope = useMenuAnimation(isOpen);;

  return (
    <div >

      <div className="flex items-center">
        <p className="">
          sdfkj
        </p>
        <div className='flex justify-end items-center w-[50%] '>
          <p className='font-bold text-white'>
            Quizzler
          </p>
        </div>

        <div className="flex justify-end w-[50%]">
          <div className="mr-4 flex items-center">
            <MenuToggle toggle={() => setIsOpen(!isOpen)} />
          </div>

        </div>
      </div>

      <div ref={scope} className={`absolute bg-black h-[80%] w-full flex justify-center items-center ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-700 ease-in-out`}>
        <Menu />
      </div>

    </div>
  );
};

export default Header;


function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations = isOpen
      ? [
        [
          "nav",
          { transform: "translateX(0%)" },
          { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.0 }
        ],
        [
          "li",
          { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
          { delay: stagger(0.05), at: "-0.1" }
        ]
      ]
      : [
        [
          "li",
          { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
          { delay: stagger(0.05, { from: "last" }), at: "<" }
        ],
        ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }]
      ];

    animate([
      [
        "path.top",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" }
      ],
      ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      [
        "path.bottom",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" }
      ],
      ...menuAnimations
    ]);
  }, [isOpen]);

  return scope;
}