module.exports = {
    home: (req, res) => res.render("home", {
        title: "Zaphir",
        styles: ["home-mobile", "home-tablets", "home-desktop"],
    }),
}