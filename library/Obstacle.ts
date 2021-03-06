/// <reference path="./WorldActor.ts"/>
/// <reference path="./CollisionCallback.ts"/>
/// <reference path="./Lol.ts"/>
/// <reference path="./Level.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>

/**
 * Obstacles are usually walls, except they can move, and can be used to run all sorts of arbitrary
 * code that changes the game, or the behavior of the things that collide with them. It's best to
 * think of them as being both "a wall" and "a catch-all for any behavior that we don't have
 * anywhere else".
 */
class Obstacle extends WorldActor {
    /// One of the main uses of obstacles is to use hero/obstacle collisions as a way to run custom
    /// code. This callback defines what code to run when a hero collides with this obstacle.
    mHeroCollision: CollisionCallback;
    /// This callback is for when an enemy collides with an obstacle
    mEnemyCollision: CollisionCallback;
    /// This callback is for when a projectile collides with an obstacle
    mProjectileCollision: CollisionCallback;
    /// Indicate that this obstacle does not re-enableTilt jumping for the hero
    mNoJumpReenable: boolean;
    /// a sound to play when the obstacle is hit by a hero
    //private mCollideSound: Sound;
    /// how long to delay (in nanoseconds) between attempts to play the collide sound
    private mCollideSoundDelay: number; //long
    /// Time of last collision sound
    private mLastCollideSoundTime: number; //long

    /**
     * Build an obstacle, but do not give it any Physics body yet
     *
     * @param width   width of this Obstacle
     * @param height  height of this Obstacle
     * @param imgName Name of the image file to use
     */
    constructor(game: Lol, level: MainScene, width: number, height: number, imgName: string) { //TODO: protected?
        super(game, level, imgName, width, height);
    }

    // /**
    //  * Internal method for playing a sound when a hero collides with this obstacle
    //  */
    // playCollideSound(): void {
    //     if (this.mCollideSound == null)
    //         return;
    //
    //     // Make sure we have waited long enough since the last time we played the sound
    //     let now = System.currentTimeMillis(); //TODO: find an equivalent for this
    //     if (now < this.mLastCollideSoundTime + this.mCollideSoundDelay)
    //         return;
    //     this.mLastCollideSoundTime = now;
    //     this.mCollideSound.play(Lol.getGameFact(this.mScene.mConfig, "volume", 1));
    // }

    /**
     * Code to run when an Obstacle collides with a WorldActor.
     *
     * The Obstacle always comes last in the collision hierarchy, so no code is needed here
     *
     * @param other   Other object involved in this collision
     * @param contact A description of the contact that caused this collision
     */
    //@Override
    onCollide(other: WorldActor, contact: PhysicsType2d.Dynamics.Contacts.Contact): void {
    }

    // /**
    //  * Make the Obstacle into a pad that changes the hero's speed when the hero glides over it.
    //  * <p>
    //  * These "pads" will multiply the hero's speed by the factor given as a parameter. Factors can
    //  * be negative to cause a reverse direction, less than 1 to cause a slowdown (friction pads), or
    //  * greater than 1 to serve as zoom pads.
    //  *
    //  * @param factor Value to multiply the hero's velocity when it collides with this Obstacle
    //  */
    // public void setPad(final float factor) {
    //     // disable collisions on this obstacle
    //     setCollisionsEnabled(false);
    //     // register a callback to multiply the hero's speed by factor
    //     mHeroCollision = new CollisionCallback() {
    //         @Override
    //         public void go(WorldActor self, WorldActor h, Contact c) {
    //             Vector2 v = h.mBody.getLinearVelocity();
    //             v.scl(factor);
    //             h.updateVelocity(v.x, v.y);
    //         }
    //     };
    // }
    //
    // /**
    //  * Call this on an obstacle to make it behave like a "pad" obstacle, except with a constant
    //  * additive (or subtractive) effect on the hero's speed.
    //  *
    //  * @param boostAmountX  The amount to add to the hero's X velocity
    //  * @param boostAmountY  The amount to add to the hero's Y velocity
    //  * @param boostDuration How long should the speed boost last (use -1 to indicate "forever")
    //  */
    // public void setSpeedBoost(final float boostAmountX, final float boostAmountY, final float boostDuration) {
    //     // disable collisions on this obstacle
    //     setCollisionsEnabled(false);
    //     // register a callback to change the hero's speed
    //     mHeroCollision = new CollisionCallback() {
    //         @Override
    //         public void go(WorldActor self, final WorldActor h, Contact c) {
    //             // boost the speed
    //             Vector2 v = h.mBody.getLinearVelocity();
    //             v.x += boostAmountX;
    //             v.y += boostAmountY;
    //             h.updateVelocity(v.x, v.y);
    //             // now set a timer to un-boost the speed
    //             if (boostDuration > 0) {
    //                 // set up a timer to shut off the boost
    //                 Timer.schedule(new Task() {
    //                     @Override
    //                     public void run() {
    //                         Vector2 v = h.mBody.getLinearVelocity();
    //                         v.x -= boostAmountX;
    //                         v.y -= boostAmountY;
    //                         h.updateVelocity(v.x, v.y);
    //                     }
    //                 }, boostDuration);
    //             }
    //         }
    //     };
    // }
    //
    // /**
    //  * Control whether the hero can jump if it collides with this obstacle while in the air
    //  *
    //  * @param enable true if the hero can jump again, false otherwise
    //  */
    // public void setReJump(boolean enable) {
    //     mNoJumpReenable = !enable;
    // }
    //
    // /**
    //  * Make the object a callback object, so that custom code will run when a hero collides with it
    //  *
    //  * @param activationGoodies1 Number of type-1 goodies needed before this callback works
    //  * @param activationGoodies2 Number of type-2 goodies needed before this callback works
    //  * @param activationGoodies3 Number of type-3 goodies needed before this callback works
    //  * @param activationGoodies4 Number of type-4 goodies needed before this callback works
    //  * @param delay              The time between when the collision happens, and when the callback
    //  *                           code runs. Use 0 for immediately
    //  * @param callback           The code to run when the collision happens
    //  */
    // public void setHeroCollisionCallback(int activationGoodies1, int activationGoodies2,
    //                                      int activationGoodies3, int activationGoodies4,
    //                                      final float delay, final CollisionCallback callback) {
    //     // save the required goodie counts, turn off collisions
    //     final int[] counts = new int[]{activationGoodies1, activationGoodies2, activationGoodies3, activationGoodies4};
    //     setCollisionsEnabled(false);
    //
    //     // register a callback
    //     mHeroCollision = new CollisionCallback() {
    //         @Override
    //         public void go(WorldActor self, final WorldActor ps, final Contact c) {
    //             // Make sure the contact is active (it's not if this is a pass-through event)
    //             if (c.isEnabled()) {
    //                 // check if callback is activated, if so run Callback code
    //                 boolean match = true;
    //                 for (int i = 0; i < 4; ++i)
    //                     match &= counts[i] <= mGame.mManager.mGoodiesCollected[i];
    //                 if (match) {
    //                     // run now, or delay?
    //                     if (delay <= 0) {
    //                         callback.go(Obstacle.this, ps, c);
    //                     } else {
    //                         Timer.schedule(new Task() {
    //                             @Override
    //                             public void run() {
    //                                 callback.go(Obstacle.this, ps, c);
    //                             }
    //                         }, delay);
    //                     }
    //                 }
    //             }
    //         }
    //     };
    // }
    //
    // /**
    //  * Make the object a callback object, so custom code will run when an enemy collides with it
    //  *
    //  * @param delay    The time between when the collision happens, and when the callback code runs.
    //  *                 Use 0 for immediately
    //  * @param callback The code to run when an enemy collides with this obstacle
    //  */
    // public void setEnemyCollisionCallback(final float delay, final CollisionCallback callback) {
    //     mEnemyCollision = new CollisionCallback() {
    //         @Override
    //         public void go(WorldActor self, final WorldActor ps, final Contact c) {
    //             // run the callback after a delay, or immediately?
    //             if (delay <= 0) {
    //                 callback.go(Obstacle.this, ps, c);
    //             } else {
    //                 Timer.schedule(new Task() {
    //                     @Override
    //                     public void run() {
    //                         callback.go(Obstacle.this, ps, c);
    //                     }
    //                 }, delay);
    //             }
    //         }
    //     };
    // }
    //
    // /**
    //  * Make the object a callback object, so custom code will run when a projectile collides with it
    //  *
    //  * @param callback The code to run on a collision
    //  */
    // public void setProjectileCollisionCallback(final CollisionCallback callback) {
    //     mProjectileCollision = callback;
    // }
    //
    // /**
    //  * Indicate that when the hero collides with this obstacle, we should make a sound
    //  *
    //  * @param sound The name of the sound file to play
    //  * @param delay How long to wait before playing the sound again, in milliseconds
    //  */
    // public void setCollideSound(String sound, long delay) {
    //     mCollideSound = mScene.mMedia.getSound(sound);
    //     mCollideSoundDelay = delay * 1000000;
    // }
}
