import React, {useEffect, useRef} from "react";

export function Canvas({cities, route, distances})
{
    const ref = useRef()
    useEffect(() => {
        if (ref.current){
            const ctx = ref.current.getContext('2d')
            let timer = setInterval(()=>{
                if (cities.length > 0 && ctx !== null)
                {
                    ctx.clearRect(0,0,1600,900);
                    clearInterval(timer);
                    const radius = 40;
                    const left =  0.5*(ref.current?.width??1600);
                    const top = 130;
                    ctx.canvas.height = 130*route.length-30
                    ctx.canvas.width = window.innerWidth;
                    for (let i = 0; i < route.length; i++) {
                        ctx.strokeStyle = cities.includes(route[i])? '#ffffff':'#1d1d1b';
                        ctx.lineWidth = 8;
                        ctx.fillStyle = cities.includes(route[i])? '#e50000':'#68b42e';
                        ctx.beginPath();
                        ctx.arc(left, top * i+radius*1.5, radius, 0, 2 * Math.PI);
                        ctx.stroke();
                        ctx.fill();
                        ctx.closePath();

                        ctx.lineWidth = 4;
                        ctx.strokeStyle = 'black';
                        ctx.fillStyle = 'black';
                        ctx.font = "16px Calibri";
                        ctx.beginPath();
                        ctx.lineTo(left, top * i+radius*2.5)
                        ctx.lineTo(left, top * i+radius*4)
                        ctx.closePath();
                        ctx.fillText(String(distances[i]).replaceAll('.', ',')+' km', left+10, top * i+radius*3.3);
                        ctx.stroke();
                        ctx.fillText(route[i], left-0.75*radius, top * i+radius*1.6);
                    }
                }
            },500)

        }
    }, []);

    return <canvas ref={ref} width={window.innerWidth} height={window.innerWidth}>
    </canvas>
}