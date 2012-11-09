game.Player = me.Rect.extend({
    "init" : function init(x, y) {
        var space = cm.getSpace();
        var w = 32,
            h = 64,
            color = "pink";

        this.parent(new me.Vector2d(x - (w / 2), y - (h / 2)), w, h);
        this.visible = true;

        this.color = color;

        this.body = new cp.Body(1, Infinity);
        var shape = space.addShape(new cp.BoxShape(this.body, w, h));
        shape.setElasticity(0.3);
        shape.setFriction(0.8);
        shape.setLayers(c.LAYER_SHAPES);

        this.body.p = cp.v(x, me.video.getHeight() - y);
        space.addBody(this.body);
    },

    "update" : function update() {
        var b = this.body,
            p = b.p,
            pos = this.pos;

        pos.x = p.x - b.hw;
        pos.y = me.video.getHeight() - p.y - b.hw;

        var shape = this.body.shapeList[0];
        if (me.input.isKeyPressed("right")) {
            b.activate();
            shape.surface_v = cp.v(200, 0);
        }
        else if (me.input.isKeyPressed("left")) {
            b.activate();
            shape.surface_v = cp.v(-200, 0);
        }
        else {
            shape.surface_v = cp.vzero;
        }

        return ((b.vx != 0) || (b.vy != 0));
    },

    "draw" : function draw(context) {
        var b = this.body,
            p = b.p,
            w = this.width,
            h = this.height,
            hw = -w / 2,
            hh = -h / 2;

        context.save();

        context.translate(p.x, me.video.getHeight() - p.y);
        context.rotate(-b.a);

        context.fillStyle = b.isSleeping() ? "gray" : this.color;
        context.fillRect(hw, hh, w, h);

        context.lineWidth = 3;
        context.strokeStyle = "black";
        context.strokeRect(hw, hh, w, h);

        context.restore();
    }
});