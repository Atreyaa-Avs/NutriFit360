import { Skia } from "@shopify/react-native-skia";

type Value = string | number;
type Values = Value[];

export const glsl = (soruce: TemplateStringsArray, ...values: Values) => {
    const processed = soruce.flatMap((s,i) => [s,values[i]]).filter(Boolean);
    return processed.join("");
}

export const frag = (soruce: TemplateStringsArray, ...values: Values) => {
    const code = glsl(soruce, ...values);
    const rt = Skia.RuntimeEffect.Make(code);
    if(rt === null){
        throw new Error("Couldn't compile shader: "+ code);
    }
}