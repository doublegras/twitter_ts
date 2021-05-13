"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        //console.log(req.user.local.email);
        next();
    }
    else {
        res.redirect("/auth/signin/form");
    }
};
//# sourceMappingURL=guard.config.js.map