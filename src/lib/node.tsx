import { Fragment, type ReactNode } from "react";

/**
 * Seperti `fill`, tetapi nilainya boleh elemen React (mis. angka contoh berpenanda `<Ph>`).
 * fillNode("Mulai {amount} per bulan", { amount: <Ph on>Rp 150.000</Ph> })
 */
export function fillNode(template: string, values: Record<string, ReactNode>): ReactNode {
  return template.split(/(\{\w+\})/g).map((part, i) => {
    const key = /^\{(\w+)\}$/.exec(part)?.[1];
    return <Fragment key={i}>{key && key in values ? values[key] : part}</Fragment>;
  });
}
