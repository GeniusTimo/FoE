<!DOCTYPE html><html lang="de">
<head>
    <meta charset="utf-8">
    <title>Forge of Empires Tool</title>
    <meta name="author" content="GeniusTimo">
    <meta name="description" content="Was wird das wohl?">
    <meta name="viewport" content="width=device-width, maximum-scale=1">
    <!-- mein JavaScript einbinden -->
    <script src="script.js"></script>
    <!-- CSS von Bootstrap einbinden -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php
        if (empty($_POST["level"])) {
            $level = 0;
        } else {
            $level = $_POST["level"];
        }
        if (empty($_POST["bonus"])) {
            $bonus = 85;
        } else {
            $bonus = $_POST["bonus"];
        }
    ?>
    <div class="alert alert-success" role="alert">Warten auf Feedback 🙂</div></div>
    <div class="container">
        <form method="post">
            <div class="form-group">
                <label for="level">Die aktuelle Stufe deiner Arche</label>
                <input type="number" class="form-control" name="level" value=<?php echo $level?> min="0" max="100">
            </div>
            <div class="form-group">
                <label for="bonus">Archenbonus (in %)</label>
                <input type="number" class="form-control" name="bonus" value=<?php echo $bonus?> min="10" max="100">
            </div>
            <button type="submit" class="btn btn-primary">Berechnen!</button>
        </form><br>
    </div>
    <script>create(<?php echo $level?>, <?php echo $bonus?>)</script>
    <footer class="footer"><div class="container">
        <span class="text-muted">Von GeniusTimo mit ❤️ erstellt</span>
    </div></footer>
</body>
</html>