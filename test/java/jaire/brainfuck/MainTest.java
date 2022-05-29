package jaire.brainfuck;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.net.URL;
import java.io.*;
import java.util.Objects;

public class MainTest extends BaseTest {
    @Test
    public void ptr() {
        setInputStream(">>><>><<<<>\nptr\nexit");
        Main.main(new String[0]);
        assertEquals("ptr: 1", getOutput());
    }

    @Test
    public void mem() {
        setInputStream("+++-++----+\nmem\nexit");
        Main.main(new String[0]);
        assertEquals("mem: 1", getOutput());
    }

    @Test
    public void consoleInput() {
        setInputStream("--------[-->+++<]>.+++[->+++<]>.[--->+<]>----.+.\nexit");
        Main.main(new String[0]);
        assertEquals("test", getOutput());
    }

    @Test
    public void fileInput() throws URISyntaxException {
        URL resource = getClass().getClassLoader().getResource("program.bf");
        File file = Paths.get(Objects.requireNonNull(resource, "No 'program.bf' resource").toURI()).toFile();
        String path = file.getAbsolutePath();

        Main.main(new String[] {path});
        assertEquals("Hello World!", getOutput());
    }
}
