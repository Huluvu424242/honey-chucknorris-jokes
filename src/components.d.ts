/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface HoneyChucknorrisJokes {
        /**
          * Zeitintervall nachdem ein neuer Witz abgerufen wird (in Sekunden).
         */
        "changePeriod": number;
    }
}
declare global {
    interface HTMLHoneyChucknorrisJokesElement extends Components.HoneyChucknorrisJokes, HTMLStencilElement {
    }
    var HTMLHoneyChucknorrisJokesElement: {
        prototype: HTMLHoneyChucknorrisJokesElement;
        new (): HTMLHoneyChucknorrisJokesElement;
    };
    interface HTMLElementTagNameMap {
        "honey-chucknorris-jokes": HTMLHoneyChucknorrisJokesElement;
    }
}
declare namespace LocalJSX {
    interface HoneyChucknorrisJokes {
        /**
          * Zeitintervall nachdem ein neuer Witz abgerufen wird (in Sekunden).
         */
        "changePeriod"?: number;
    }
    interface IntrinsicElements {
        "honey-chucknorris-jokes": HoneyChucknorrisJokes;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "honey-chucknorris-jokes": LocalJSX.HoneyChucknorrisJokes & JSXBase.HTMLAttributes<HTMLHoneyChucknorrisJokesElement>;
        }
    }
}
