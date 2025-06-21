import { useEffect, useRef, useState } from "react";
import { Flipper, Flipped } from 'react-flip-toolkit'
import shuffle from 'lodash.shuffle'

type LegoBlocksProps = {
    letters:string[];
    reverse:string[];
    steps:number[][];

  }



export default function LegoBlocks({letters,steps,reverse}:LegoBlocksProps){
  const [positions, setPositions] = useState(Array.from({ length: letters.length }, (_, i) => i))
  const elRenderCheck = useRef<HTMLDivElement | null>(null);

//   const shuffleList = () => setData(shuffle(data))
//  const shuffleList = () => setData([10,1,2,3,4,5,6,7,8,9,0]);

  const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

  const validateResult = ()=>{
    
  }

  useEffect(()=>{

      let current = [...positions]
      const shuffleList = async() => {
        for(const step of steps){
          const copy = [...current]
          let temp:number = copy[step[0]];
          copy[step[0]] = copy[step[1]];
          copy[step[1]] = temp;
          console.log(step)
          console.log(copy);
          
          setPositions(copy);
          current = copy;
          await delay(500)
        }
      }

      if(elRenderCheck.current){
        shuffleList();
        validateResult();
      }

    },[]);

  

  return (
    <Flipper flipKey={positions.join('')}>
      <div ref={elRenderCheck}></div>
      <ul className="list flex flex-row">
        {positions.map(d => (
          <Flipped key={d} flipId={d}>
        <div className=" bg-[#F5145F] w-[50px] h-[50px] rounded-md m-2 font-bold flex flex-row text-xl justify-center items-center" >
            {letters[d].toLocaleUpperCase()}
            </div>
          </Flipped>
        ))}
      </ul>
    </Flipper>
  )
}

