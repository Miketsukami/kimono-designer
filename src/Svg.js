export function Group ({ visible, color, children }) {
    return visible ? (
        <g fill={color || "white"}>
        {children}
        </g>
    ) : null
}
