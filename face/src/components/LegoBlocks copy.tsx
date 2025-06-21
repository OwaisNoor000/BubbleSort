import { useRef, useState } from "react";

type LegoBlocksProps = {
    letters?:string[]
}

export default function LegoBlocks({letters}:LegoBlocksProps){
    const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(["A", "B","C"]); // you can expand to more

  const swap = () => {
    if (!containerRef.current) return;

    const children = containerRef.current.children;
    if (children.length < 2) return;

    const el1 = children[0] as HTMLElement;
    const el2 = children[1] as HTMLElement;

    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    const dx = rect2.left - rect1.left;
    const dy = rect2.top - rect1.top;

    el1.style.transition = "transform 0.4s";
    el2.style.transition = "transform 0.4s";

    el1.style.transform = `translate(${dx}px, ${dy}px)`;
    el2.style.transform = `translate(${-dx}px, ${-dy}px)`;

    setTimeout(() => {
      // reset styles
      el1.style.transition = "";
      el1.style.transform = "";
      el2.style.transition = "";
      el2.style.transform = "";

      // now make the swap permanent in state
      setItems(([first, second]) => [second, first]);
    }, 400);
  };


    return (
        <div ref={containerRef} className="flex flex-row justify-start items-center">
            
            {letters?.map(letter=>(<div className=" bg-[#F5145F] w-[50px] h-[50px] rounded-md m-2 font-bold flex flex-row text-xl justify-center items-center" onClick={swap}>{letter.toUpperCase()}</div>))}
        </div>
    )
}