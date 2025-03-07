import { act, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import CartasFigura from "../containers/partida/components/CartasFigura";
import { describe } from "node:test";
import Figura1 from "@/components/assets/cartas/CartasFiguras/Figura1.png";
import Figura2 from "@/components/assets/cartas/CartasFiguras/Figura2.png";
import Figura3 from "@/components/assets/cartas/CartasFiguras/Figura3.png";
import { FiguraContextProvider } from "@/context/UsarCartaFiguraContext";
import { PartidaProvider } from "@/context/PartidaContext";
import { MovimientoContextProvider } from "@/context/UsarCartaMovimientoContext";
import { PartidaWebsocketProvider } from "@/context/PartidaWebsocket";

vi.mock("@/services/api/obtener_carta_figura", () => ({
    ObtenerCartasFiguras: vi.fn((id_partida: number, id_jugador: number) =>
        Promise.resolve([
            { figura: "f1", revelada: true },
            { figura: "f2", revelada: true },
            { figura: "f3", revelada: true },
        ])
    ),
}));

describe("Cartas de figuras", () => {
    test("Se renderizan las 3 cartas", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CartasFigura id_partida={1} id_jugador={1} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        const cartasImg = await screen.findAllByRole("img");
        expect(cartasImg.length).toBe(3);
    });

    test("Tienen bien su texto alternativo", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CartasFigura id_partida={1} id_jugador={1} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        const cartasImg = await screen.findAllByRole("img");

        expect(cartasImg[0]).toHaveAttribute("alt", "Carta 1");
        expect(cartasImg[1]).toHaveAttribute("alt", "Carta 2");
        expect(cartasImg[2]).toHaveAttribute("alt", "Carta 3");
    });

    test("Se muestra la imagen correcta", async () => {
        await act(async () => {
            render(
                <PartidaWebsocketProvider>
                    <PartidaProvider>
                        <MovimientoContextProvider>
                            <FiguraContextProvider>
                                <CartasFigura id_partida={1} id_jugador={1} />
                            </FiguraContextProvider>
                        </MovimientoContextProvider>
                    </PartidaProvider>
                </PartidaWebsocketProvider>
            );
        });

        const cartasImg = await screen.findAllByRole("img");
        expect(cartasImg[0]).toHaveAttribute("src", Figura1);
        expect(cartasImg[1]).toHaveAttribute("src", Figura2);
        expect(cartasImg[2]).toHaveAttribute("src", Figura3);
    });
});
