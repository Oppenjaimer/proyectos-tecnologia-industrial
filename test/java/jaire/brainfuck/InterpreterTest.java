package jaire.brainfuck;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class InterpreterTest extends BaseTest {
    @Test
    public void interpretUnmatchedBracketsError() {
        interpreter.interpret("[[[]");
        assertEquals("Error: unmatched brackets", getOutput());
    }

    @Test
    public void interpretHelloWorld() {
        interpreter.interpret("+[-->-[>>+>-----<<]<--<---]>-.>>>+.>>..+++[.>]<<<<.+++.------.<<-.>>>>+.");
        assertEquals("Hello, World!", getOutput());
    }

    @Test
    public void interpretUserInput() {
        setInputStream("a\nb\nc");
        interpreter.interpret(",.,+.,++.");
        assertEquals("ace", getOutput());
    }

    @Test
    public void getPtr() {
        interpreter.interpret(">>><>><<");
        assertEquals(2, interpreter.getPtr());
    }

    @Test
    public void getMem() {
        interpreter.interpret("++---+-+++++");
        assertEquals(4, interpreter.getMem());
    }
}