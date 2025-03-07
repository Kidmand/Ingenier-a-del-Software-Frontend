import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Board from "../containers/partida/components/Board";
import { Partida } from "@/models/types";
import { SaveSessionPartida } from "@/services/session_browser";
import { FiguraContextProvider } from "@/context/UsarCartaFiguraContext";
import { PartidaProvider } from "@/context/PartidaContext";
import { MovimientoContextProvider } from "@/context/UsarCartaMovimientoContext";
import { PartidaWebsocketProvider } from "@/context/PartidaWebsocket";

// Mockear el servicio ObtenerTablero
vi.mock("@/services/api/ver_tablero", () => ({
    ObtenerTablero: vi.fn(
        (id_partida: number): Promise<{ tablero6x6: number[][] }> =>
            Promise.resolve({
                tablero6x6: [
                    [1, 1, 4, 4, 1, 2],
                    [1, 1, 2, 2, 3, 4],
                    [2, 2, 3, 4, 1, 2],
                    [3, 4, 1, 2, 3, 4],
                    [4, 2, 2, 4, 1, 3],
                    [3, 4, 1, 3, 3, 3],
                ],
                figuras: [
                    {
                        nombre: "f20",
                        casillas: [
                            { row: 0, column: 0 },
                            { row: 0, column: 1 },
                            { row: 1, column: 0 },
                            { row: 1, column: 1 },
                        ],
                    },
                    {
                        nombre: "f25",
                        casillas: [
                            { row: 5, column: 3 },
                            { row: 5, column: 4 },
                            { row: 5, column: 5 },
                            { row: 4, column: 5 },
                        ],
                    },
                ],
            })
    ),
}));

const mockPartida: Partida = {
    id: 1,
    nombre: "Partida 1",
};

describe("Componente Board", () => {
    SaveSessionPartida(mockPartida);

    test("Se renderiza todo el tablero", async () => {
        render(
            <PartidaWebsocketProvider>
                <PartidaProvider>
                    <MovimientoContextProvider>
                        <FiguraContextProvider>
                            <Board id_partida={1} />
                        </FiguraContextProvider>
                    </MovimientoContextProvider>
                </PartidaProvider>
            </PartidaWebsocketProvider>
        );

        const buttons = await screen.findAllByRole("button");

        // Verificar que se rendericen 36 botones (6x6)
        expect(buttons).toHaveLength(36);
    });

    test("Se renderizan los colores correctos", async () => {
        render(
            <PartidaWebsocketProvider>
                <PartidaProvider>
                    <MovimientoContextProvider>
                        <FiguraContextProvider>
                            <Board id_partida={1} />
                        </FiguraContextProvider>
                    </MovimientoContextProvider>
                </PartidaProvider>
            </PartidaWebsocketProvider>
        );

        const buttons = await screen.findAllByRole("button");

        // Verificar que algunos botones tengan los colores correctos
        expect(buttons[0]).toHaveClass("bg-red-400");
        expect(buttons[2]).toHaveClass("bg-yellow-400");
        expect(buttons[3]).toHaveClass("bg-yellow-400");
        expect(buttons[5]).toHaveClass("bg-green-400");
    });

    test("Todos los botones tienen color", async () => {
        render(
            <PartidaWebsocketProvider>
                <PartidaProvider>
                    <MovimientoContextProvider>
                        <FiguraContextProvider>
                            <Board id_partida={1} />
                        </FiguraContextProvider>
                    </MovimientoContextProvider>
                </PartidaProvider>
            </PartidaWebsocketProvider>
        );

        const buttons = await screen.findAllByRole("button");

        // Verificar que todos los colores tengan un color valido
        for (let index = 0; index < 36; index++) {
            expect(buttons[index]).toHaveClass(
                /bg-(red|green|blue|yellow)-400/
            );
        }
    });

    test("Se están detectando las figuras del tablero", async () => {
        render(
            <PartidaWebsocketProvider>
                <PartidaProvider>
                    <MovimientoContextProvider>
                        <FiguraContextProvider>
                            <Board id_partida={1} />
                        </FiguraContextProvider>
                    </MovimientoContextProvider>
                </PartidaProvider>
            </PartidaWebsocketProvider>
        );

        const buttons = await screen.findAllByRole("button");

        const clase_de_casilla_destacada = "shine";
        await setTimeout(() => {
            expect(buttons[0]).toHaveClass(clase_de_casilla_destacada);
            expect(buttons[1]).toHaveClass(clase_de_casilla_destacada);
            expect(buttons[6]).toHaveClass(clase_de_casilla_destacada);
            expect(buttons[7]).toHaveClass(clase_de_casilla_destacada);
            expect(buttons[29]).toHaveClass(clase_de_casilla_destacada);
            expect(buttons[33]).toHaveClass(clase_de_casilla_destacada);
            expect(buttons[34]).toHaveClass(clase_de_casilla_destacada);
            expect(buttons[35]).toHaveClass(clase_de_casilla_destacada);
        }, 600);

        expect(buttons[20]).toHaveClass("border-2 border-black");
        expect(buttons[18]).toHaveClass("border-2 border-black");
        expect(buttons[2]).toHaveClass("border-2 border-black");
    });
});
