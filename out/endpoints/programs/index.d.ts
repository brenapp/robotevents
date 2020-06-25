export interface Program {
    id: number;
    abbr: string;
    name: string;
}
export declare function fetch(id: number, maxAge?: number): Promise<Program>;
export declare function all(maxAge?: number): Promise<Program[]>;
export declare type ProgramAbbr = "VRC" | "VEXU" | "WORKSHOP" | "CREATE" | "VIQC" | "DIS" | "NRL" | "RAD" | "TVCR" | "TIQC" | "VAIC-HS" | "VAIC-U";
export declare function get(abbr: ProgramAbbr): number;
