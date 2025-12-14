const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({error: "Unathorized"});
        }
        const hasRole = req.user.roles.some(role => roles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ error: "Access denied" });
        }
        next();
    }
}

module.exports = authorizeRoles;