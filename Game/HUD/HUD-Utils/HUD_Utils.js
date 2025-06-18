export default function getXPBarLevel(xpPercent) {
    if (xpPercent >= 100) return 5;
    if (xpPercent >= 80)  return 4;
    if (xpPercent >= 60)  return 3;
    if (xpPercent >= 40)  return 2;
    if (xpPercent >= 20)  return 1;
    return 0;
}