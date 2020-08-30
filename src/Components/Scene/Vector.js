
/*
    Because ThreeJs Vector3 doesn't want to work, this
        is an old Vector class I wrote for an old project
        called njin
    
    Important notes: self arg
        - by default vectors do not modify themselves and
            instead return a new vector
        - to modify in place add optional arg
        
        - ex:
            - position = position.add(velocity.mult(delta))
            - // or: 
            - position.add(velocity.mult(delta, false), true);

*/

import { Vector3 } from "three";



const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

/**
 * Vector class
 * @param {Number} x - x coord
 * @param {Number} y - y coord
 * @param {Number} z - z coord
 */
export default function Vector(x, y, z) {

    if(Array.isArray(x)) {
        this.x = x[0];
        this.y = x[1];
        this.z = x[2];
    }

    else if(x && isNaN(x)) {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
    }

    else {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    this.set = function(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }

    this.zero       = () => { return this.set(0, 0, 0); }
    this.one        = () => { return this.set(1, 1, 1); }
    this.forward    = () => { return this.set(0, 0, 1); }
    this.right      = () => { return this.set(1, 0, 0); }
    this.up         = () => { return this.set(0, 1, 0); }

    // is not normalized
    this.random     = () => { return this.set(Math.random(), Math.random(), Math.random()); }

    /**
     * Adds another vector
     * @param {Vector} vector
     * @return {Vector} sum
     */
    this.add = function(vector, self=false) {
        if (self === true) {
            this.x += vector.x;
            this.y += vector.y;
            this.z += vector.z;
            return this;
        }
        else {
            return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
        }
    };

    /**
     * Adds a scalar to each axis
     * @param {Number} scalar
     * @return {Vector} sum
     */
    this.addScalar = function(scalar, self=false) {
        if (self === true) {
            this.x += scalar;
            this.y += scalar;
            this.z += scalar;
            return this;
        }
        else {
            return new Vector(this.x + scalar, this.y + scalar, this.z + scalar);
        }
    };


    /**
     * Multiplies a vector by a scalar
     * @param {number} scalar
     * @param {boolean} self - applies to this vector
     * @return {Vector} product
     */
    this.mult = function(scalar, self=false) {
        if (self) {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            return this;
        }
        else return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    };

    /**
     * 
     */
    this.multVector = (sVector, self=false) => {
        let result = new Vector(this.x*sVector.x, this.y*sVector.y, this.z*sVector.z);
        if (self) {
            Object.assign(this, result);
        }
        return result;
    };



    this.map = (inMin, inMax, outMin, outMax, self=false) => {
        let result = new Vector(
            map(this.x, inMin, inMax, outMin, outMax),
            map(this.y, inMin, inMax, outMin, outMax),
            map(this.z, inMin, inMax, outMin, outMax),
        );
        if (self) {
            Object.assign(this, result);
        }
        return result;
    }


    this.mapVector = (inMin, inMax, outMin, outMax, self=false) => {
        let result = new Vector(
            map(this.x, inMin.x, inMax.x, outMin.x, outMax.x),
            map(this.y, inMin.y, inMax.x, outMin.x, outMax.x),
            map(this.z, inMin.y, inMax,x, outMin.x, outMax.x),
        );
        if (self) {
            Object.assign(this, result);
        }
        return result;
    }







    /**
     * Rotates a vector
     * @param {number} rad - angle in radians
     * @param {boolean} self - applies to this vector
     * @return {Vector} - result
     */
    this.rotate = function(rad, self=false) {
        let x = this.x * Math.cos(rad) - this.z * Math.sin(rad);
        let z = this.x * Math.sin(rad) + this.z * Math.cos(rad);
        if (self) {
            this.x = x;
            this.z = z;
            return this;
        }
        else {
            return new Vector(x, this.y, z);
        }
    };

    // scale 0-1 on amount, add to target scaled to opposite amount
    /**
     * interpolates a vector
     * @param {Vector} vector - target vector for max value
     * @param {number} amount - range(0-1), amount to interpolate
     * @param {boolean} self - applies to this vector
     * @return {Vector} result
     */
    this.lerp = (vector, amount, self=false) => { 
        return this.mult(amount, self).add(vector.mult(1-amount, false), self); }

    /**
     * subtracts another vector
     * @param {Vector} vector
     * @param {boolean} self
     * @return {Vector} difference
     */
    this.sub = (vector, self=false) => { return this.add(vector.mult(-1, false), self); }

    /**
     * Substracts a scalar from each axis
     * @param {Number} scalar
     * @return {Vector} difference
     */
    this.subScalar = (scalar, self=false) => { return this.addScalar(-scalar, self); }


    /**
     * divides a vector by a scalar
     * @param {number} scalar
     * @param {boolean} self - applies to this vector
     * @return {Vector} quotient
     */
    this.div = (scalar, self=false) => { return this.mult(1/scalar, self); }

    /**
     * normalizes a vector
     * @param {boolean} self - applies to this vector
     * @return {Vector} normalized vector
     */
    this.normalize = (self=false) => { return this.div(this.mag(), self); }

    /**
     * sets the magnitude of a vector
     * @param {Number} length - length to set the vector to
     * @param {boolean} self - applies to this vector
     * @return {Vector} result
     */
    this.setMag = (length, self=false) => {
        return this.normalize(self).mult(length, self);
    };

    /**
     * gets the square magnitude of a vector
     * @return {number} the square magnitude
     */
    this.sqMag = () => {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
    };

    /**
     * gets the magnitude of a vector
     * @return {number} the magnitude
     */
    this.mag = () => {
        return Math.sqrt(this.sqMag());
    };


    this.max = () => {
        if(this.x > this.y && this.x > this.z) return this.x;
        if(this.y > this.x && this.y > this.z) return this.y;
        return this.z;
    }

    /**
     * gets the direction a vector is pointing (x, y)
     * @return {number} the direction (radians)
     */
    this.dir = () => {
        return Math.atan2(this.z, this.x);
    };

    this.cross = (v) => {
        return new Vector(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.z
        );
    }

    this.dot = (v) => {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }


    this.abs = (self=false) => {
        if (self) {
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
            this.z = Math.abs(this.z);
            return this;
        }
        else {
            return new Vector(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
        }
    };

    this.mod = (modifier, self=false) => {
        if (self) {
            Object.keys(modifier).forEach(
                (k) => {
                    if (!!this[k]) this[k] = modifier[k];
                }
            );
            return self;
        }
        else return new Vector(modifier.x||this.x, modifier.y||this.y, modifier.z||this.z);
    };

    this.toString = (decimalPlaces=3) => `Vector{ ${this.x.toFixed(decimalPlaces)}, ${this.y.toFixed(decimalPlaces)}, ${this.z.toFixed(decimalPlaces)} }`;

    this.toArray = () => [this.x, this.y, this.z];

    this.setEach = (obj) => {
        obj.x = this.x;
        obj.y = this.y;
        obj.z = this.z;
    }

    this.checkEach = (obj, fix = -1) => {
        if(fix < 0) {
            return  !(
                obj.x != this.x || 
                obj.y != this.y || 
                obj.z != this.z
                );
        }
        else {
            return  !(
                obj.x.toFixed(fix) != this.x.toFixed(fix) || 
                obj.y.toFixed(fix) != this.y.toFixed(fix) || 
                obj.z.toFixed(fix) != this.z.toFixed(fix)
                );
        }
    }

    this.addToEach = (obj) => {
        obj.x += this.x;
        obj.y += this.y;
        obj.z += this.z;
    }
}

export {map};
