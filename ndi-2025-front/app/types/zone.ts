// zone.ts
interface Zone {
    label: string;
    note: string;
    isActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseMove: (e: React.MouseEvent) => void;
    id: string;
    position: string;
    hoverColor: string;
}