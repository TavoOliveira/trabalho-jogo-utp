import HitboxGroup from "./hitbox-group.js";
import RectHitbox from "./rect-hitbox.js";

export default class Collision {
    /**
     * @param {Hitbox | HitboxGroup} a 
     * @param {Hitbox | HitboxGroup} b 
     * @returns {boolean}
     */
    static check(a, b) {
        const aList = a instanceof HitboxGroup ? a.hitboxes : [a];
        const bList = b instanceof HitboxGroup ? b.hitboxes : [b];

        for (const ha of aList) {
            for (const hb of bList) {
                if (this.checkSingle(ha, hb)) return true;
            }
        }

        return false;
    }

    static checkSingle(hitboxA, hitboxB) {
        if (hitboxA instanceof RectHitbox && hitboxB instanceof RectHitbox)
            return this.rectVsRect(hitboxA, hitboxB);

        else if (hitboxA instanceof CircleHitbox && hitboxB instanceof CircleHitbox)
            return this.circleVsCircle(hitboxA, hitboxB);

        else if (
            (hitboxA instanceof RectHitbox && hitboxB instanceof CircleHitbox) ||
            (hitboxA instanceof CircleHitbox && hitboxB instanceof RectHitbox)
        )
            return this.circleVsRect(
                hitboxA instanceof CircleHitbox ? hitboxA : hitboxB,
                hitboxA instanceof RectHitbox ? hitboxA : hitboxB
            );
            
        return false;
    }

    /**
     * @param {RectHitbox} a 
     * @param {RectHitbox} b
     * @returns {boolean} 
     */
    static rectVsRect(a, b) {
        const A = a.bounds;
        const B = b.bounds;
        return (
            A.x < B.x + B.width &&
            A.x + A.width > B.x &&
            A.y < B.y + B.height &&
            A.y + A.height > B.y
        );
    }

    /**
     * 
     * @param {CircleHitbox} a 
     * @param {CircleHitbox} b 
     * @returns {boolean}
     */
    static circleVsCircle(a, b) {
        const ac = a.center;
        const bc = b.center;
        const dx = ac.x - bc.x;
        const dy = ac.y - bc.y;
        const distance = Math.hypot(dx, dy);
        return distance < a.radius + b.radius;
    }

    /**
     * @param {CircleHitbox} circle 
     * @param {RectHitbox} rect 
     * @returns {boolean}
     */
    static circleVsRect(circle, rect) {
        const c = circle.center;
        const r = rect.bounds;

        const closestX = Math.max(r.x, Math.min(c.x, r.x + r.width));
        const closestY = Math.max(r.y, Math.min(c.y, r.y + r.height));

        const dx = c.x - closestX;
        const dy = c.y - closestY;

        return dx * dx + dy * dy < circle.radius * circle.radius;
    }
}