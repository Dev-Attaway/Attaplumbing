const {
    User,
    Posts,
    Slides
} = require("../../modals");

const router = require("express").Router();

// Slideshow tool, /admin/slideshow
// adding slide list for admin panel to edit / delete
router.get("/slideshow", async (req, res) => {
    try {
        //get all blog posts
        const slideDB = await Slides.findAll({})

        // Convert Sequelize instances to plain JavaScript objects
        const mySlides = slideDB.map((post) => post.get({ plain: true }));

        mySlides.sort((a, b) => a.slideorder - b.slideorder);

        res.render("adminSlideShow", {
            mySlides,
        });
    } catch (err) {
        res.status(400).json(err.message);
    }
});


router.post('/newSlide', async (req, res) => {
    try {
      // Destructure slideorder from the request body
      let { slideorder } = req.body;
  
      // If slideorder is not provided, set it to 1 by default
      if (!slideorder) {
        slideorder = 1;
      }
  
      // Loop to find the first available slideorder value
      let isOrderTaken = true;
      while (isOrderTaken) {
        // Check if a slide with the current slideorder already exists
        const existingSlide = await Slides.findOne({ where: { slideorder } });
  
        if (existingSlide) {
          // If it exists, increment slideorder and check again
          slideorder++;
        } else {
          // If it doesn't exist, break the loop
          isOrderTaken = false;
        }
      }
  
      // Create a new slide with the determined slideorder
      req.body.slideorder = slideorder;
      const newPost = await Slides.create(req.body);
  
      console.log(newPost);
      res.status(200).json(newPost);
    } catch (err) {
      console.log('error');
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//updateSlide

router.put("/updateSlide/:id", async (req, res) => {
    try {
        const updateBlog = await Slides.update(
            req.body, // Data to update
            { where: { slideId: req.params.id } } // Condition for update (where clause)
        );
        res.status(200).json(updateBlog);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

//delete slide

router.delete('/removeSlide/:id', (req, res) => {
  try {
      const deleteSlide = Slides.destroy({
        where: {
          slideId: req.params.id,
        },
      });
      res.status(200).json(deleteSlide);
    } catch {
      res.status(400).json(err);
    }
});



module.exports = router;