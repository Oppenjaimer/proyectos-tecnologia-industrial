package jaire.brainfuck;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;

import java.io.*;

public abstract class BaseTest {
    protected ByteArrayOutputStream outContent;
    protected ByteArrayInputStream inContent;
    protected final PrintStream originalOut = System.out;
    protected final InputStream originalIn = System.in;
    protected final Interpreter interpreter = new Interpreter();

    protected String getOutput() {
        return outContent.toString().replaceAll(System.getProperty("line.separator"), "").replaceAll("Brainfuck > ", "");
    }

    @BeforeEach
    private void setPrintStream() {
        outContent = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outContent));
    }

    protected void setInputStream(String input) {
        inContent = new ByteArrayInputStream(input.getBytes());
        System.setIn(inContent);
    }

    @AfterEach
    private void restoreStreams() {
        System.setOut(originalOut);
        System.setIn(originalIn);
    }
}
