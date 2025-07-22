export declare const SITE_VARIANTS: {
    readonly DEFAULT: "default";
    readonly LUXURY: "luxury";
    readonly ADVENTURE: "adventure";
    readonly FAMILY: "family";
};
export type SiteVariant = typeof SITE_VARIANTS[keyof typeof SITE_VARIANTS];
export declare const VARIANT_THEMES: {
    readonly default: {
        readonly primary: "#3B82F6";
        readonly secondary: "#1F2937";
        readonly accent: "#F59E0B";
    };
    readonly luxury: {
        readonly primary: "#D4AF37";
        readonly secondary: "#1A1A1A";
        readonly accent: "#FFFFFF";
    };
    readonly adventure: {
        readonly primary: "#22C55E";
        readonly secondary: "#1F2937";
        readonly accent: "#F59E0B";
    };
    readonly family: {
        readonly primary: "#3B82F6";
        readonly secondary: "#1E40AF";
        readonly accent: "#F472B6";
    };
};
export declare const ANIMATION_DURATIONS: {
    readonly FAST: 200;
    readonly NORMAL: 300;
    readonly SLOW: 500;
    readonly VERY_SLOW: 1000;
};
//# sourceMappingURL=index.d.ts.map