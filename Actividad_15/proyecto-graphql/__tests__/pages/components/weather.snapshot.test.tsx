/**
 * @jest-environment jsdom
 */

import { act, create } from "react-test-renderer";
import PageComponentWeather from "../../../pages/components/weather";

describe("PageComponentWeather", () => {
    test("renders correctly", () => {
        const component = create(
            <PageComponentWeather
                zipCode="15551"
                weather="Sunny"
                tempC="28"
                tempF="82.4"
                friends={["15552", "15553"]}
            />
        );

        // Verifica que el componente no sea null y procesa la instantánea
        const tree = component.toJSON();
        if (!tree) {
            throw new Error("Component failed to render");
        }
        expect(tree).toMatchSnapshot();
    });

    test("clicks the h1 element and updates the state", async () => {
        let component: any;

        await act(async () => {
            component = create(
                <PageComponentWeather
                    zipCode="15551"
                    weather="Sunny"
                    tempC="28"
                    tempF="82.4"
                    friends={["15552", "15553"]}
                />
            );
        });

        // Asegúrate de que el componente esté montado antes de buscar el h1
        if (!component) {
            throw new Error("Component was not mounted");
        }

        const heading = component.root.findByType("h1");

        // Simula el clic en el encabezado (h1)
        await act(() => {
            heading.props.onClick();
        });

        // Verifica la instantánea después del clic
        const tree = component.toJSON();
        if (!tree) {
            throw new Error("Component failed to render after click");
        }
        expect(tree).toMatchSnapshot();
    });
});
