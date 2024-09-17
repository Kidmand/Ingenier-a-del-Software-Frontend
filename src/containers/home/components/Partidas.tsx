import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area"

type Partida = {
  id: number;
  nombre: string;
};


function crearPartidas(cantidadPartidas:any) {
    const partidas: Partida[] = [];
  
    for (let i = 1; i <= cantidadPartidas; i++) {
      partidas.push({
        id: i,
        nombre: `Partida ${i}`
      });
    }
  
    return partidas;
  }

function Partidas () {
    const partidas: Partida[] = crearPartidas(15)
    return (
        <div>
            <ScrollArea className="w-96 h-48 overflow-auto rounded-md border bg-red-400 ">
                <p className="text-center text-lg font-black">Unirse a una partida</p>
                <div className="flex flex-col space-y-4 p-4">
                    <ul>
                        {partidas.map((partida) => (
                            <li key={partida.id}>
                                <Link className="redirigir" to={`/espera/${partida.id}`}>
                                    <button className="w-full text-black font-black text-center p-2 rounded-md hover:bg-red-600">{partida.nombre}</button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </ScrollArea>
        </div>
    );
};

export default Partidas;
