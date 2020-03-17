/**
Sample Program to convert uppercase to lowercase and vice versa in a given string
input: Punith
output: pUNITH
*/

import java.util.*;
import java.io.BufferedReader;
import java.io.InputStreamReader;

class ToggleString {
  public static void main(String args[] ) throws Exception {
      BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
      String input = reader.readLine();

      StringBuilder sb = new StringBuilder(input);

      for(int index=0; index < sb.length(); index++) {
      	char currentChar = sb.charAt(index);

      	if(Character.isLowerCase(currentChar))
      	{
      		sb.setCharAt(index, Character.toUpperCase(currentChar));
      } else {
          sb.setCharAt(index, Character.toLowerCase(currentChar));
      }
      }

      System.out.println(sb.toString());
  }
}
