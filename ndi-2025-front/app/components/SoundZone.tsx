// SoundZone.tsx
import { Button } from "~/components/Button";

interface SoundZoneProps {
    zone: Zone;
}

export function SoundZone({ zone }: SoundZoneProps) {
    return (
        <button
            onMouseEnter={zone.onMouseEnter}
            onMouseLeave={zone.onMouseLeave}
            onMouseMove={zone.onMouseMove}
            className="relative"
            style={{
                /*outline: zone.isActive
                    ? '3px solid rgba(59,130,246,0.8)'
                    : '1px dashed rgba(59,130,246,0.3)',
                borderRadius: 12,
                transition: 'outline 0.2s ease',*/
                padding : '100px',
                paddingBottom : '10px'
            }}
        >
            <Button
                id={zone.id}
                label={zone.label}
                position="relative"
                hoverColor={zone.hoverColor}
            />
        </button>
    );
}