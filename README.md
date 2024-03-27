# Tweeter Project

Tweeter is a simple, responsive, single-page Twitter clone.

This project demonstrates HTML, CSS, JS, jQuery and AJAX front-end skills, as well as Node, Express back-end skills.  Additional skills acquired during the completion of this project are the use of SASS for more efficient use of CSS styles.

## Getting Started

1. Clone this repository onto your local device.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- body-parser 1.15.2
- chance 1.0.2
- md5 2.1.0

## Functional Requirements

-   A client-side Single Page App (SPA)
-   Communicates with a server via AJAX

### Display Requirements

-   Navigation Bar:
    
    -   is fixed to the top -----	DONE 
    -   has padding on both sides  -----	DONE 
    -   contains Compose button -----	DONE 
        
-   Compose Tweet box:
    
    -   is displayed above the list of tweets
    -   contains a  `form`  for submitting tweets, which itself contains:
        -   a  `textarea`  for new tweet content -----	DONE 
        -   a left-aligned  `button`  for submitting new tweets -----	DONE 
    -   contains a Character Counter, right-aligned, which by default shows 140 -----	DONE 
-   List of Tweets:
    
    -   displays tweets in reverse-chronological order (that is, by creation time descending) -----	DONE 
-   Individual Tweets have a:
    
    -   header, which contains the user's:
        -   avatar, on the left -----	DONE 
        -   name, on the left and after the avatar -----	DONE 
        -   handle, on the right -----	DONE 
    -   body, which contains the tweet text -----	DONE 
    -   footer, which displays: -----	DONE 
        -   how long ago the tweet was created, on the left -----	DONE 
        -   "Flag", "Re-tweet" and "Like" action icons on the right -----	DONE 

### Behaviour

#### Individual Tweets

-   When the user hovers over a tweet, that tweet should display a box shadow. -----	DONE 

#### Action Icons

-   When the user hovers over an icon ("Flag", "Re-tweet" and "Like") the icon should change colour. -----	DONE 

#### Character Counter

-   When a user types into the Compose Tweet  `textarea`, the Character Counter is updated to show how many characters a user may still type (subtracting the number of characters they've typed from the maximum allowable character count of 140) -----	DONE 
    
-   The Character Counter turns red (or similar) when more than 140 characters have been typed into the Compose Tweet  `textarea`, and it shows how many characters over the 140 limit have been typed (using a negative number) -----	DONE 
    

#### Compose Tweet

-   When a user submits an invalid tweet (the tweet  `textarea`  is empty or contains more than 140 characters), an appropriate error message is displayed -----	DONE 
    
-   When a user submits a valid tweet, the list of tweets is refreshed (displaying the new tweet), the Compose Tweet  `textarea`  is cleared, and the Character Counter is reset (to 140) -----	DONE 
    

### Stretch

#### Navigation Bar

-   When a user clicks the Compose button in the Navigation Bar:
    -   if the Compose Tweet box is currently hidden, then it is shown, and the  `textarea`  inside it is auto-focused -----	DONE 
    -   if the Compose Tweet box is currently showing, then it is hidden -----	DONE 
    -   in either case, transitions between 'shown' and 'hidden' states should be animated -----	DONE 

#### Second Toggle Button

-   When a user scrolls a second button appears in the lower right hand corner:
    -   if the user clicks this button they are brought back up to the top of the page -----	DONE 

